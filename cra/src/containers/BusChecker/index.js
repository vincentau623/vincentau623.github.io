import React, { useEffect, useState } from "react";
import {
  getRouteList,
  getRoute,
  getStopList,
  getStop,
  getRouteStopList,
  getRouteStop,
  getEta,
  getStopEta,
  getRouteEta,
} from "../../api/KMB";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import _ from "lodash";
import moment from "moment";

const BusChecker = () => {
  const [routeList, setRouteList] = useState([]);
  const [stopList, setStopList] = useState([]);
  const [currentStopId, setCurrentStopId] = useState();
  const [currentStopInfo, setCurrentStopInfo] = useState();

  // useEffect(() => {
  //   console.log("routeList", routeList);
  // }, [routeList]);

  // useEffect(() => {
  //   console.log("stopList", stopList);
  // }, [stopList]);

  useEffect(() => {
    const init = async () => {
      setRouteList((await getRouteList()).data);
      setStopList((await getStopList()).data);
      // setStopList([(await getStop("854BC3A8D4DE6AA9")).data]);
    };
    init();
  }, []);

  const fetchStopInfo = async (stopId) => {
    const stopInfo = await getStopEta(stopId);
    // console.log(stopInfo)
    setCurrentStopId(stopId);
    setCurrentStopInfo(stopInfo);
  };

  const loadStopInfo = () => {
    const output = [];
    const groupedRoute = _.groupBy(currentStopInfo.data, "route");
    const lastUpdate = currentStopInfo.generated_timestamp;
    output.push(<hr></hr>);

    for (const route in groupedRoute) {
      output.push(<div style={{ fontWeight: "bold" }}>{route}</div>);
      const routeInfo = groupedRoute[route][0];
      const detailRoute = routeList.find((el) => {
        return (
          el.route === routeInfo.route &&
          el.bound === routeInfo.dir &&
          `${el.service_type}` === `${routeInfo.service_type}`
        );
      });
      output.push(<div>{`${detailRoute.orig_tc} -> ${detailRoute.dest_tc}`}</div>);
      if (groupedRoute[route][0] && groupedRoute[route][0]?.eta) {
        output.push(<span>{moment(groupedRoute[route][0]?.eta).format("HH:mm:ss")} | </span>);
      }
      if (groupedRoute[route][1] && groupedRoute[route][1]?.eta) {
        output.push(<span>{moment(groupedRoute[route][1]?.eta).format("HH:mm:ss")} | </span>);
      }
      if (groupedRoute[route][2] && groupedRoute[route][2]?.eta) {
        output.push(<span>{moment(groupedRoute[route][2]?.eta).format("HH:mm:ss")}</span>);
      }
    }
    output.push(<hr></hr>);

    output.push(<div>Last Update: {moment(lastUpdate).format("HH:mm:ss")}</div>);
    return output;
  };

  return (
    <div id="map">
      <MapContainer
        center={[22.302711, 114.177216]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup disableClusteringAtZoom="18">
          {stopList &&
            stopList.length > 0 &&
            stopList.map((el) => {
              if (el.lat && el.long) {
                return (
                  <Marker
                    key={el.stop}
                    position={[el.lat, el.long]}
                    eventHandlers={{
                      click: () => {
                        fetchStopInfo(el.stop);
                      },
                    }}
                  >
                    <Popup>
                      <div>{el.name_tc}</div>
                      {currentStopId === el.stop && loadStopInfo()}
                    </Popup>
                  </Marker>
                );
              }
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default BusChecker;

import React, { useEffect, useState } from "react";
import "./index.css";

import LeafletMap from "../../components/LeafeltMap";

import { getCarParkSlot, getCarParkInfo, getCarParkIntegrated } from "../../api/carpark";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const CarparkInfo = () => {
  const [carParkInfo, setCarParkInfo] = useState();

  useEffect(() => {
    const init = async () => {
      const carParkInfo = (await getCarParkInfo())?.car_park;
      const carParkSlot = (await getCarParkSlot())?.car_park;
      const merged = [
        ...carParkInfo
          .concat(carParkSlot)
          .reduce((m, o) => m.set(o.park_id, Object.assign(m.get(o.park_id) || {}, o)), new Map())
          .values(),
      ];
      //   console.log(merged);
      setCarParkInfo(merged);
    };

    init();
  }, []);

  const getVacancy = (vehicleType) => {
    // console.log(vehicleType);
    let resultJsx = [];
    resultJsx.push(
      <div>
        <br></br>空位:{" "}
      </div>
    );
    vehicleType.map((type) => {
      if (type.type === "P") {
        resultJsx.push("Cars/Vans: ");
      } else if (type.type === "M") {
        resultJsx.push("Motor Cycles: ");
      } else {
        resultJsx.push("Others: ");
      }
      type.service_category.map((el) => {
        if (el.category === "HOURLY") {
          resultJsx.push("時租 - ");
        } else if (el.category === "DAILY") {
          resultJsx.push("日租 - ");
        }
        if (el.vacancy_type === "A") {
          el.vacancy === -1
            ? resultJsx.push("停車場經營者未能提供數據")
            : resultJsx.push(el.vacancy);
        } else if (el.vacancy_type === "B") {
          el.vacancy === -1
            ? resultJsx.push("停車場經營者未能提供數據")
            : el.vacancy === 0
            ? resultJsx.push("FULL")
            : resultJsx.push("有車位");
        } else {
          resultJsx.push("Car park closed");
        }
        resultJsx.push(<br></br>);
      });
    });
    return resultJsx;
  };

  return (
    <div>
      <div id="map">
        <MapContainer
          center={[22.302711, 114.177216]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup disableClusteringAtZoom="16">
            {carParkInfo &&
              carParkInfo.map((el) => {
                if (el.latitude && el.longitude) {
                  return (
                    <Marker position={[el.latitude, el.longitude]}>
                      <Popup>
                        <div>{el.name_tc}</div>
                        <div dangerouslySetInnerHTML={{ __html: el.remark_tc }}></div>
                        {getVacancy(el.vehicle_type)}
                      </Popup>
                    </Marker>
                  );
                }
              })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default CarparkInfo;

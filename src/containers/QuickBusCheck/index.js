import React, { useEffect, useState } from "react";
import { getRouteEta, getRouteList, getRouteStop, getStop } from "../../api/KMB";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

const QuickBusCheck = () => {
  const [routeList, setRouteList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState();
  const [routeStopList, setRouteStopList] = useState([]);
  const [selectedRouteStop, setSelectedRouteStop] = useState();
  const [routeEta, setRouteEta] = useState([]);
  const [etaResult, setEtaResult] = useState([]);

  useEffect(() => {
    const fetchRouteStop = async () => {
      const newRouteStops = (
        await getRouteStop(
          selectedRoute.route,
          selectedRoute.bound === "I" ? "inbound" : "outbound",
          selectedRoute.service_type
        )
      ).data;
      await Promise.all(
        newRouteStops.map(async (el, index) => {
          const result = (await getStop(el.stop)).data;
          return { ...result, seq: index };
        })
      ).then((list) => {
        setRouteStopList(list);
      });
    };

    const fetchRouteEta = async () => {
      const newRouteEta = (await getRouteEta(selectedRoute.route, selectedRoute.service_type)).data;
      setRouteEta(newRouteEta);
    };

    if (selectedRoute) {
      fetchRouteStop();
      fetchRouteEta();
    }
  }, [selectedRoute]);

  useEffect(() => {
    const lastStop = localStorage.getItem("lastRouteStop");
    if (lastStop && routeStopList.length > 0) {
      setSelectedRouteStop(routeStopList.find((el) => `${el.seq}` === `${lastStop}`));
    } else {
      setSelectedRouteStop(routeStopList[0]);
    }
  }, [routeStopList]);

  useEffect(() => {
    if (selectedRouteStop && routeEta.length > 0 && selectedRoute) {
      const stopEta = routeEta.filter(
        (el) => el.seq === selectedRouteStop.seq && el.dir === selectedRoute.bound
      );
      setEtaResult(stopEta);
    }
  }, [routeEta, selectedRoute, selectedRouteStop]);

  useEffect(() => {
    const init = async () => {
      const newRouteList = (await getRouteList()).data;
      setRouteList(newRouteList);
      const lastRoute = localStorage.getItem("lastRoute");
      if (lastRoute) {
        setSelectedRoute(
          newRouteList.find((el) => `${el.route}${el.bound}${el.service_type}` === lastRoute)
        );
      } else {
        setSelectedRoute(newRouteList[0]);
      }
    };
    init();
  }, []);

  const displayETA = () => {
    return (
      <div>
        {etaResult.length > 0 ? (
          etaResult.map((el) => {
            return (
              <div>
                <div>{moment(el.eta).format("HH:mm:ss")} ({moment(el.eta).diff(moment(),'minutes')})</div>
              </div>
            );
          })
        ) : (
          <div>No ETA at the moment</div>
        )}
      </div>
    );
  };

  return (
    <div>
      {routeList.length > 0 && selectedRoute && (
        <Autocomplete
          disablePortal
          value={selectedRoute}
          onChange={(event, newValue) => {
            localStorage.setItem(
              "lastRoute",
              `${newValue.route}${newValue.bound}${newValue.service_type}`
            );
            setSelectedRoute(newValue);
          }}
          id="combo-box-demo"
          options={routeList}
          getOptionLabel={(option) =>
            `${option.route} - ${option.orig_tc}->${option.dest_tc} (${option.bound}${option.service_type})`
          }
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Route" />}
        />
      )}
      {routeStopList.length > 0 && selectedRouteStop && (
        <Autocomplete
          disablePortal
          value={selectedRouteStop}
          onChange={(event, newValue) => {
            localStorage.setItem("lastRouteStop", `${newValue.seq}`);
            setSelectedRouteStop(newValue);
          }}
          id="combo-box-demo"
          options={routeStopList}
          getOptionLabel={(option) => `${option.seq} - ${option.name_tc}`}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Stop" />}
        />
      )}
      {selectedRouteStop && routeEta.length > 0 && displayETA()}
    </div>
  );
};

export default QuickBusCheck;

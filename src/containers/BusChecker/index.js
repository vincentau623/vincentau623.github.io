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

const BusChecker = () => {
  const [routeList, setRouteList] = useState([]);

  useEffect(() => {
      console.log("routeList",routeList)
  },[routeList]);

  useEffect(() => {
    const init = async () => {
      return setRouteList(await getRouteList());
    };
    init();
  }, []);

  return <div>Bus</div>;
};

export default BusChecker;

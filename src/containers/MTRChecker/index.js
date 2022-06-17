import React, { useEffect, useState } from "react";

import { getMTRETA } from "../../api/MTR";
import { lines, stations } from "../../utils/values";

const MTRChecker = () => {
  console.log(lines, stations);
  useEffect(() => {
    const init = async () => {
      console.log(await getMTRETA("AEL", "HOK"))
    };
    init();
  }, []);
  return <div></div>;
};

export default MTRChecker;

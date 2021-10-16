import React, { useEffect, useState, useContext } from "react";
import { config } from "./config.json";


const ThemeSettings = () => {

  useEffect(() => {
    if (config.layout_version && config.layout_type) {
      document.body.className = `${config.layout_version}`;
    }
    
    }, []);


  return (
    <div>
     
      
    </div>
  );
};

export default ThemeSettings;

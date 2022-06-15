import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const LeafletMap = ({Elements}) => {
  return (
    <MapContainer
      center={[22.401487, 113.969813]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[22.401487, 113.969813]}></Marker>
    </MapContainer>
  );
};

export default LeafletMap;

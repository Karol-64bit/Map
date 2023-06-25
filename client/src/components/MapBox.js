import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const MapBox = ({ data }) => {
  const categoryIcons = {
    castle: require("../icons/castle.png"),
    beack: require("../icons/beach.png"),
    city: require("../icons/city.png"),
    park: require("../icons/park.png"),
    mountain: require("../icons/mountain.png"),
  };

  const getIconUrl = (category) => {
    return categoryIcons[category] || require("../icons/default.png");
  };

  const findInGoogle = (searchQuery) => {
    console.log(searchQuery);
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`;
    console.log(searchUrl);
    const newWindow = window.open(searchUrl, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  };



  return (
    <div className="mapBoxDiv">
      <MapContainer center={[51.75, 19.45]} zoom={6}>
        {/* OPEN STREEN MAPS TILES */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {/* GOOGLE MAPS TILES */}
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
          // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {data.map((item) => {
          const iconUrl = getIconUrl(item.category);
          console.log(item.lon)

          return (
            <Marker
              position={[parseFloat(item.lat), parseFloat(item.lon)]}
              icon={
                new Icon({
                  iconUrl,
                  iconSize: [38, 38],
                  iconAnchor: [19, 40],
                })
              }
              key={item.id}
            >
              <Popup>
                <div className="popUpBox">
                  <h3>{item.name}</h3>
                  {item.description}
                  <button
                    onClick={() => {
                      findInGoogle(item.name)
                    }}
                  >
                    Find in google
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapBox;
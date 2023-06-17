import React from "react";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// create custom icon
const customIcon = new Icon({
    iconUrl: require("../icons/placeholder.png"),
    iconSize: [38, 38],
    iconAnchor: [19,40]
  });

const MapBox = ({data}) =>{
    return (
        <div className="mapBoxDiv">
        {/* {console.log(data)} */}
            <MapContainer center={[51.75, 19.45]} zoom={6}>
                {/* OPEN STREEN MAPS TILES */}
                {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                {/* GOOGLE MAPS TILES */}
                <TileLayer
                    attribution="Google Maps"
                    // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
                    // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
                    url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />

                {data.map((item) => (
                        
                        <Marker position={[parseFloat(item.lat),parseFloat(item.lon)]} icon={customIcon} key={item.id}>
                            {console.log([parseFloat(item.lat),parseFloat(item.lon)])}
                            <Popup>{item.description}</Popup>
                        </Marker>
                ))}

            </MapContainer>

        </div>
    )
}

export default MapBox;
import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
    const [selected, setSelected] = useState(null);

    return (
    // Mapa z markerami
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: 52, lng: 21 }}>
        {data.map(( item ) => (
            <Marker
                key={item.id}
                position={{ 
                    lat: item.lat, 
                    lng: item.lon 
                }}
                onClick={() => { setSelected(item); }}
            />
        ))}

    {/* Okno z informacjami */}
        {selected && (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lon }}
                onCloseClick={() => { setSelected(null); }}
            >
                <div>
                    <h2>{selected.name}</h2>
                    <p>{selected.description}</p>
                </div>
            </InfoWindow>
        )}
    </GoogleMap>
    );
                }

const WrappedMap = withScriptjs(withGoogleMap(Map));

// const MapBox = ({data}) =>{
const MapBox = ({}) =>{
    return (
        <div style={{ width:"100vw", height:"100vh"}}>
            {/* {data.map((item, i) => (
                <div key={i}>
                    <p>
                        {item.id} {item.name} {item.description} {item.category} {item.lat} {item.lon}
                    </p>
                </div>
            ))} */}
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY // Tu klucz do API z pliku .env.local
                }`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </div>
    )
}

export default MapBox;
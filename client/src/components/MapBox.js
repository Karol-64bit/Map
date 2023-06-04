import React from "react";

const MapBox = ({data}) =>{
    return (
        <div>
            {data.map((item, i) => (
                <div key={i}>
                    <p>
                        {item.id} {item.name} {item.description} {item.category} {item.lat} {item.lon}
                    </p>
                </div>
            ))}
            
        </div>
    )
}

export default MapBox;
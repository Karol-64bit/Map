// import React from 'react'
import DataFetcher from './components/DataFetcher';
import { GoogleMap } from '@react-google-maps';

function App() {

  const data = DataFetcher();

  function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      />
    )
  }

  console.log(data)
  
  return (
    <div>
      {/* {data.map((item, i) => (
        <div key={i}>
          <p>{item.id} {item.name}</p>
          
        </div>
      ))} */}
      
    </div>
  );
}

export default App;

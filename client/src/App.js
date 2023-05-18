import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() =>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []);

  return (
    <div>
      {(typeof backendData.locations === 'undefined')? (
        <p>Loading...</p>
      ):(
        backendData.locations.map((location, i)=>(
          <p>{location}</p>
        ))
      )}
    </div>
  );
}

export default App;

// Pizza z anansem i ciepłe wygazowane piwo
// import React from 'react'
import DataFetcher from './components/DataFetcher';

function App() {

  const data = DataFetcher();

  console.log(data)

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <p>{item.id} {item.name}</p>
        </div>
      ))}

    </div>
  );
}

export default App;

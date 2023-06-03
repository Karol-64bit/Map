import React, {useState} from 'react'
import DataFetcher from './components/DataFetcher';
import CategoryList from './components/CategoryList';

function App() {

  const data = DataFetcher();

  console.log(data)
  
  return (
    <div>
      <CategoryList />
      {data.map((item, i) => (
        <div key={i}>
          <p>{item.id} {item.name}</p>
        </div>
      ))}

    </div>
  );
}

export default App;

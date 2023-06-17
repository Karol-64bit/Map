import React, { useState } from 'react';
import DataFetcher from './components/DataFetcher';
import CategoryList from './components/CategoryList';
import MapBox from './components/MapBox';
import './App.css'

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price)
  };

  const data = DataFetcher({ selectedCategories ,selectedPrice});


  return (
    <div className='app'>
      <CategoryList selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} selectedPrice={selectedPrice} onPriceChange={handlePriceChange}/>
      
      <MapBox data={data} />
    </div>
  );
}

export default App;
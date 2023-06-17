import React, { useState } from 'react';
import DataFetcher from './components/DataFetcher';
import CategoryList from './components/CategoryList';
import MapBox from './components/MapBox';
import './App.css'

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedCongestions, setCongestions] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (price) => {
    if (selectedPrice.includes(price)) {
      setSelectedPrice(selectedPrice.filter((item) => item !== price));
    } else {
      setSelectedPrice([...selectedPrice, price]);
    }
  };

  const handleCongestionsChange = (congestion) => {
    if (selectedCongestions.includes(congestion)) {
      setCongestions(selectedCongestions.filter((item) => item !== congestion));
    } else {
      setCongestions([...selectedCongestions, congestion]);
    }
  };

  const data = DataFetcher({ selectedCategories ,selectedPrice, selectedCongestions});


  return (
    <div className='app'>
      <CategoryList 
        selectedCategories={selectedCategories} 
        onCategoryChange={handleCategoryChange} 
        selectedPrice={selectedPrice} 
        onPriceChange={handlePriceChange} 
        selectedCongestions={selectedCongestions} 
        onCongestionsChange={handleCongestionsChange}
      />
      <MapBox data={data} />
    </div>
  );
}

export default App;
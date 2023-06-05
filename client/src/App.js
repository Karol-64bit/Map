import React, { useState, useEffect } from 'react';
import DataFetcher from './components/DataFetcher';
import CategoryList from './components/CategoryList';
import MapBox from './components/MapBox';


function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const data = DataFetcher({ selectedCategories });

  return (
    <div>
      {/* <CategoryList selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
      
      */} 
      <MapBox />

    </div>
  );
}

export default App;
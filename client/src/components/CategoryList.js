import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../App.css";

const CategoryList = ({ selectedCategories, onCategoryChange, selectedPrice, onPriceChange, selectedCongestions, onCongestionsChange}) => {

  const [categories, setCategories] = useState([]);
  const prices = ['low', 'medium', 'high'];
  const congestions = ['less crowded', 'moderate', 'crowded'];

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories");
      const categoriesData = response.data;
      setCategories(categoriesData.data);
      console.log(categoriesData);
      console.log(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  const handlePriceChange = (price) => {
    onPriceChange(price);
  };

  const handleCongestionsChange = (congestions) => {
    onCongestionsChange(congestions);
  };

  if (categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='categoryDiv'>
      <h2>📚 Category</h2>

      <h4>🚀 Type of place</h4>
      {categories.map((category, index) => (
        <div key={index} className='listDiv'>
          <input
            className='categoryInput'
            type="checkbox"
            id={category}
            name="category"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}

      <h4>💰 Prices</h4>
      {prices.map((price, index) => (
        <div key={index} className='listDiv'>
          <input
            className='priceInput'
            type="checkbox"
            id={price}
            name="category"
            value={price}
            checked={selectedPrice.includes(price)}
            onChange={() => handlePriceChange(price)}
          />
          <label htmlFor={price}>{price}</label>
        </div>
      ))}

      <h4>👨‍👩‍👧‍👦 Congestions</h4>
      {congestions.map((congestion, index) => (
        <div key={index} className='listDiv'>
          <input
            className='congestionInput'
            type="checkbox"
            id={congestion}
            name="category"
            value={congestion}
            checked={selectedCongestions.includes(congestion)}
            onChange={() => handleCongestionsChange(congestion)}
          />
          <label htmlFor={congestion}>{congestion}</label>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;

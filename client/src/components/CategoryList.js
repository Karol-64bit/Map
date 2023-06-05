import React, { useState } from 'react';

const CategoryList = ({ selectedCategories, onCategoryChange }) => {
  const categories = ['city', 'beach', 'castle'];

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    console.log(selectedCategories);
  };

  return (
    <div className='categoryDiv'>
      <h2>Wybierz kategorie:</h2>
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
    </div>
  );
}

export default CategoryList;
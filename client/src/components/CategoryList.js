import React, { useState } from 'react';

const CategoryList = ({ selectedCategories, onCategoryChange }) => {
  const categories = ['city', 'beach', 'castle'];

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    console.log(selectedCategories);
  };

  return (
    <div>
      <h2>Wybierz kategorie:</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <input
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
      <h3>Wybrane kategorie:</h3>
      <ul>
        {selectedCategories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
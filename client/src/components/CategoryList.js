import React from 'react';

const CategoryList = ({ selectedCategories, onCategoryChange, selectedPrice, onPriceChange }) => {
  const categories = ['city', 'beach', 'castle'];

  const prices = ['low', 'medium', 'high'];

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    console.log(selectedCategories);
  };

  const handlePriceChange = (price) => {
    onPriceChange(price);
    console.log(selectedPrice);
  };

  return (
    <div className='categoryDiv'>
      <h2>Filtry:</h2>
      <h4>Typ miejsca:</h4>
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

      <h4>Koszty:</h4>
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
    </div>
  );
}

export default CategoryList;
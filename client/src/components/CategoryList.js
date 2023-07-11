import React from 'react';

const CategoryList = ({ selectedCategories, onCategoryChange, selectedPrice, onPriceChange, selectedCongestions, onCongestionsChange}) => {

  const categories = ['city', 'beach', 'castle','park','mountain'];
  const prices = ['low', 'medium', 'high'];
  const congestions = ['less crowded','moderate','crowded'];

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  const handlePriceChange = (price) => {
    onPriceChange(price);
  };

  const handleCongestionsChange = (congestions) => {
    onCongestionsChange(congestions);
  };

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
      <button className='openMenuButton' onClick={
        () => {
          const menu = document.querySelector('.categoryDiv');
          const buttonOpen = document.querySelector('.openMenuButton');
          const buttonClose = document.querySelector('.closeMenuButton');
          menu.style.position = 'relative';
          buttonOpen.style.display = 'none';
          buttonClose.style.display = 'block';
        }
      }>▶</button>
      <button className='closeMenuButton' onClick={
        () => {
          const menu = document.querySelector('.categoryDiv');
          const buttonClose = document.querySelector('.closeMenuButton');
          const buttonOpen = document.querySelector('.openMenuButton');
          menu.style.position = 'absolute';
          buttonClose.style.display = 'none';
          buttonOpen.style.display = 'block';
        }
      }>◀</button>
    </div>
  );
}

export default CategoryList;
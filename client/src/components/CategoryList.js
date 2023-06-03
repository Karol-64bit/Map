import React from "react";

const CategoryMenu = () =>{
  const categories = ['city', 'beach', 'caste']; 

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h2>Wybierz kategorie:</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="radio"
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
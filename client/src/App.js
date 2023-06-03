import React, {useState,useEffect} from 'react'
import DataFetcher from './components/DataFetcher';
import CategoryList from './components/CategoryList';

function App() {

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    console.log(selectedCategories)
  };




    const data = DataFetcher({ selectedCategories });

  
  
  return (
    <div>
      <CategoryList selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
      {data.map((item, i) => (
        <div key={i}>
          <p>{item.id} {item.name}</p>
        </div>
      ))}

      

    </div>
  );
}

export default App;
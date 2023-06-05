import { useEffect, useState } from 'react';

const DataFetcher = ({ selectedCategories }) => {
  const [data, setData] = useState([]);

  // srednia hawajska dla kazdego

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/category/${selectedCategories.join(',')}`);
        const jsonData = await response.json();
        setData(jsonData.data);
        console.log("ok")
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    if (selectedCategories.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
    // fetchData();
  }, [selectedCategories]);
  return data; 
};

export default DataFetcher;

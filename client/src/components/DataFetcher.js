import { useEffect, useState } from 'react';

const DataFetcher = ({ selectedCategories ,selectedPrice}) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if(selectedPrice == ""){
        try {
          const response = await fetch(`http://localhost:5000/api/category/${selectedCategories.join(',')}`);
          const jsonData = await response.json();
          setData(jsonData.data);
          console.log("ok")
        } catch (error) {
          console.error('Błąd pobierania danych z API:', error);
        }
      }else{
        try {
          const response = await fetch(`http://localhost:5000/api/categoryandprice/${selectedCategories.join(',')}/${selectedPrice}`);
          const jsonData = await response.json();
          setData(jsonData.data);
          console.log("ok")
        } catch (error) {
          console.error('Błąd pobierania danych z API:', error);
        }
      }
    };

    if (selectedCategories.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
    // fetchData();
  }, [selectedCategories, selectedPrice]);
  return data; 
};

export default DataFetcher;

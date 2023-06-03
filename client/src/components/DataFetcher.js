import { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);

  // srednia hawajska dla kazdego

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/places');
        const jsonData = await response.json();
        setData(jsonData.data);
        console.log("ok")
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    fetchData();
  }, []);

  return data; 
};

export default DataFetcher;

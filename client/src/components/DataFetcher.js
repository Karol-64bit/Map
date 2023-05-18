import { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api');
        const jsonData = await response.json();
        // const dataArray = Object.values(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    fetchData();
  }, []);

  return data; 
};

export default DataFetcher;

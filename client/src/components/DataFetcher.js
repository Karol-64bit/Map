import { useEffect, useState } from 'react';
import "../App.css";

const DataFetcher = ({
  selectedCategories,
  selectedPrice,
  selectedCongestions,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {    

    const fetchData = async () => {
      const queryParams = [];
      
      if (selectedCategories.length > 0) {
        console.log(selectedCategories);
        queryParams.push(`category="${encodeURIComponent(selectedCategories.join('","'))}"`);
      }
      if (selectedPrice.length > 0) {
        queryParams.push(`price="${encodeURIComponent(selectedPrice.join('","'))}"`);
      }
      if (selectedCongestions.length > 0) {
        queryParams.push(`congestion="${encodeURIComponent(selectedCongestions.join('","'))}"`);
      }
      
      const queryString = queryParams.join('&');
      const request = `http://localhost:5001/api/locations?${queryString}`;
    
      console.log(request);

      try {
        const response = await fetch(request);
        const jsonData = await response.json();
    
        setData(jsonData.data);
    
        console.log(data);
      } catch (error) {
        console.error("Błąd pobierania danych z API:", error);
      }
    };

    if (selectedCategories.length > 0 || selectedPrice.length > 0 || selectedCongestions.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
    // fetchData();
  }, [selectedCategories, selectedPrice, selectedCongestions]);
  return data;
};

export default DataFetcher;
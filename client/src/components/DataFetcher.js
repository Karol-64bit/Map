import { useEffect, useState } from 'react';

const DataFetcher = ({
  selectedCategories,
  selectedPrice,
  selectedCongestions,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        
        // const request = `http://localhost:5001/api/test/${selectedCategories.join(
        //   ","
        // )}/${selectedPrice.join(",")}/${selectedCongestions.join(",")}`;

        let request = "http://localhost:5001/api/test2/";
        let queryParams = [];

        if (selectedCategories.length > 0) {
          queryParams.push(`category IN ('${selectedCategories.join("','")}') `);
        }

        if (selectedPrice.length > 0) {
          queryParams.push(`price IN ('${selectedPrice.join("','")}') `);
        }

        if (selectedCongestions.length > 0) {
          queryParams.push(`congestion IN ('${selectedCongestions.join("','")}') `);
        }

        if (queryParams.length > 0) {
          request += `WHERE ${queryParams.join("AND ")}`;
        }
        console.log(request);
        const response = await fetch(request);
        console.log(request);
        const jsonData = await response.json();
        console.log("okokok");
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

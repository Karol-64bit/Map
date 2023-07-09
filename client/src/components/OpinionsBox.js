import React, {useState, useEffect} from 'react';
import axios from 'axios';


const OpinionsBox = (props) => {
  const username = localStorage.getItem('username');

  const api = axios.create({
    baseURL: 'http://localhost:5001',
  });


//   const [dataForFetch, setDataForFetch] = useState({
//     userId: localStorage.getItem('userId'),
//     locationId: locationId,
//   });

  const handleAddOpinion = () => {
    // Logika dodawania opinii
  };

  

  const fetchOpinion = async () => {
    try {

        const response = await axios.get(`http://localhost:5001/api/opinions?place="${props.locationId}"`);
        const data = response.data;
        console.log(data)
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };


  useEffect(() => {
    // console.log(props.locationId)
    fetchOpinion()
  }, []);

  return (
    <div className="opinionsBox">
      {/* Wyświetlanie listy opinii */}
      <h2>Opinions:</h2>
      {/* Komponent listy opinii innych użytkowników */}
      {/* <OpinionsList /> */}

      {/* Wyświetlanie formularza dodawania opinii tylko dla zalogowanych użytkowników */}
      {username && (
        <div>
          <h2>Add Opinion:</h2>
          {/* Formularz dodawania opinii */}
          {/* <OpinionForm onSubmit={handleAddOpinion} /> */}
          {/* {locationId} */}
        </div>
      )}
    </div>
  );
};

export default OpinionsBox;

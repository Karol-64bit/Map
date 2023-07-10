import React, {useState, useEffect} from 'react';
import axios from 'axios';

import closeIconImage from '../icons/close.png';
import './OpinionsBox.css'


const OpinionsBox = ({ locationId, onClose }) => {
  const username = localStorage.getItem('username');
  const [content, setContent] = useState("");
  const [data, setData] = useState([])

  const api = axios.create({
    baseURL: 'http://localhost:5001',
  });

  const handleAddOpinion = async () => {
    if(content.length > 5) {
      try {
        const response = await axios.post('http://localhost:5001/api/opinions', {
          content: content,
          user_name: username,
          user_id: localStorage.getItem('userId'),
          place_id: locationId
        });
    
        const data = response.data;
        console.log(data);
        fetchOpinion()
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }else {
      alert("Too short opinion, try to write more")
    }
  };

  const fetchOpinion = async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/opinions?place="${locationId}"`);
        const data = response.data;
        console.log(data)
        setData(data.data);
        console.log(locationId);
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    fetchOpinion()
  }, []);

  const handleChange = (event) => {
    setContent( event.target.value );
  };

  return (
    <div className="opinionsBox">
      <div onClick={handleClose}>
        <img src={closeIconImage} alt="Close" className="closeButton" />
      </div>
      <h2>Opinions:</h2>
      {data.map((item)=>{
        return(<div className='dataRow' key={item.id}>{item.user_name}: {item.content}</div>)
      })}

      {username && (
        <div>
          <h2 className='headerWithLine'>Add Opinion:</h2>
          <input
            type="text"
            id="price"
            value={content}
            onChange={handleChange}
          />
          <button onClick={handleAddOpinion}>Add</button>
        </div>
      )}
    </div>
  );
};

export default OpinionsBox;

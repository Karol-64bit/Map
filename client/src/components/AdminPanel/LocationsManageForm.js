import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationsManageForm = () => {
  const [data, setData] = useState([]);
  const [editmode, setEditMode] = useState(false); 
  const [editingRecord, setEditingRecord] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lat: "",
    lon: "",
    category: "",
    price: "",
    congestion: "",
    image: "",
  });

  const [searchText, setSearchText] = useState("");
  
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const api = axios.create({
    baseURL: "http://localhost:5001",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const fetchAllLocation = async () => {
    const request = `http://localhost:5001/api/alllocations`;

    try {
      const response = await fetch(request);
      const jsonData = await response.json();

      setData(jsonData.data);
    } catch (error) {
      console.error("Błąd pobierania danych z API:", error);
    }
  };

  useEffect(() => {
    fetchAllLocation();
  }, []);

  const handleEdit = (id) => {
    setEditMode(true);
    setEditingRecord(id);

    const selectedRecord = data.find((item) => item.id === id);

    if (selectedRecord) {
      setFormData({
        name: selectedRecord.name,
        description: selectedRecord.description,
        lat: selectedRecord.lat,
        lon: selectedRecord.lon,
        category: selectedRecord.category,
        price: selectedRecord.price,
        congestion: selectedRecord.congestion,
        image: selectedRecord.image,
      });
    }

  };

  const updateLocation = async () => {

    try {
      const response = await api.put("api/location/"+editingRecord, formData);
      console.log("ok")
      fetchAllLocation();
      setEditMode(false);
    } catch (error) {
      console.log("nie ok");
    }

  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/location/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const jsonData = await response.json();
        fetchAllLocation();
      } else {
        console.error("Błąd usuwania rekordu z API");
      }
    } catch (error) {
      console.error("Błąd połączenia z API:", error);
    }
  };




  if(!editmode) {
    return (
      <div>
        <h2>List of all location</h2>

        <div className="searchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

        <div className="locationsContainer">
          <table className="locationsTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Category</th>
                <th>Price</th>
                <th>Congestion</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{String(item.description).slice(0, 25)}...</td>
                  <td>{String(item.lat).slice(0, 8)}...</td>
                  <td>{String(item.lon).slice(0, 8)}...</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.congestion}</td>
                  <td>{String(item.image).slice(0,20)}...</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if(editmode) {
    return (
      <div>
        <h2>Edit location</h2>
          <form className="form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <label htmlFor="lat">Latitude:</label>
            <input
              type="text"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
            />

            <label htmlFor="lon">Longitude:</label>
            <input
              type="text"
              id="lon"
              name="lon"
              value={formData.lon}
              onChange={handleChange}
            />

            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <label htmlFor="congestion">Congestion:</label>
            <input
              type="text"
              id="congestion"
              name="congestion"
              value={formData.congestion}
              onChange={handleChange}
            />
            
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          <button type="button" onClick={updateLocation}>Edit</button>
          <button onClick={()=>{setEditMode(false)}}>Cancel</button>
        </form>
      </div>

    )
  }

};

export default LocationsManageForm;

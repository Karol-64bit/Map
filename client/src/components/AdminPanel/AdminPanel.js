import React, { useState } from "react";
import axios from "axios";
import LocationsForm from "./LocationsForm";
import './AdminPanel.css'


const AdminPanel = () => {
  const [open, setOpen] = useState("addLocationFormView");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lat: "",
    lon: "",
    category: "",
    price: "",
    congestion: "",
  });

  const api = axios.create({
    baseURL: "http://localhost:5001",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddLocation = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("api/newlocation", formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  if (open==="addLocationFormView") {
    return (
      <div className="addLocationForm">
        <div className="buttonGroup">
          <button className="checked" onClick={()=>{setOpen("addLocationFormView");}}>Add new location</button>
          <button className="unchecked" onClick={()=>{setOpen("manageLocationsView");}}>Manage locations</button>
          <button className="unchecked"onClick={()=>{setOpen("manageOpinionView");}}>Manage opinions</button>
        </div>
        <h2>Add new location</h2>
        <form onSubmit={handleAddLocation} className="form">
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

          <button type="submit">Add new location</button>
        </form>
      </div>
    );
  }


  if(open==="manageLocationsView"){
    return (
      <div className="addLocationForm">
        <div className="buttonGroup">
          <button
            className="unchecked"
            onClick={() => {
              setOpen("addLocationFormView");
            }}
          >
            Add new location
          </button>
          <button
            className="checked"
            onClick={() => {
              setOpen("manageLocationsView");
            }}
          >
            Manage locations
          </button>
          <button
            className="unchecked"
            onClick={() => {
              setOpen("manageOpinionView");
            }}
          >
            Manage opinions
          </button>
        </div>

            <LocationsForm />
      </div>
    );
  }

};

export default AdminPanel;

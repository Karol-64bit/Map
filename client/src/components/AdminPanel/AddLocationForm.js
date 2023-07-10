import React, {useState} from "react";
import axios from "axios";

const AddLocationForm = () => {

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


    return (
        <div>
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
    )
};

export default AddLocationForm;
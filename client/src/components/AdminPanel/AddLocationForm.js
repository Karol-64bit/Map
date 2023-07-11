import React, { useState } from "react";
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
    image: "",
  });

  const api = axios.create({
    baseURL: "http://localhost:5001",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? (checked ? value : "") : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
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

        <label htmlFor="category">Type of place:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="price"
              value="low"
              checked={formData.price === "low"}
              onChange={handleChange}
            />{" "}
            Low
          </label>
          <label>
            <input
              type="checkbox"
              name="price"
              value="medium"
              checked={formData.price === "medium"}
              onChange={handleChange}
            />{" "}
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              name="price"
              value="high"
              checked={formData.price === "high"}
              onChange={handleChange}
            />{" "}
            High
          </label>
        </div>

        <label htmlFor="congestion">Congestion:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="congestion"
              value="less crowded"
              checked={formData.congestion === "less crowded"}
              onChange={handleChange}
            />{" "}
            Low
          </label>
          <label>
            <input
              type="checkbox"
              name="congestion"
              value="moderate"
              checked={formData.congestion === "moderate"}
              onChange={handleChange}
            />{" "}
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              name="congestion"
              value="crowded"
              checked={formData.congestion === "crowded"}
              onChange={handleChange}
            />{" "}
            High
          </label>
        </div>

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Add new location</button>
      </form>
    </div>
  );
};

export default AddLocationForm;

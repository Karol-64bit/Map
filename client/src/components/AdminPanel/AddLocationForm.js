import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
  const MySwal = withReactContent(Swal)
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
      setFormData({
        name: "",
        description: "",
        lat: "",
        lon: "",
        category: "",
        price: "",
        congestion: "",
        image: "",
      });
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'New location has been added',
        showConfirmButton: false,
        timer: 1500
      })
      // alert("ok")
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
        <div className="listDiv">
          
          
          <input
            className='checkboxInput'
            type="checkbox"
            id="low"
            name="price"
            value="low"
            checked={formData.price === "low"}
            onChange={handleChange}
          />
          <label htmlFor="low">
            Low
          </label>


          
          <input
            className='checkboxInput'
            type="checkbox"
            id="medium"
            name="price"
            value="medium"
            checked={formData.price === "medium"}
            onChange={handleChange}
          />
          <label htmlFor="medium">
          Medium
          </label>
          
          <input
            className='checkboxInput'
            type="checkbox"
            id="high"
            name="price"
            value="high"
            checked={formData.price === "high"}
            onChange={handleChange}
          />
          <label htmlFor="high">
          High
          </label>

        </div>




        <label>Congestion:</label>
        <div className="listDiv">
          
          <div>
          <input
            className='checkboxInput'
            id="Low"
            type="checkbox"
            name="congestion"
            value="less crowded"
            checked={formData.congestion === "less crowded"}
            onChange={handleChange}
          />
          <label htmlFor="Low">
            Less Crowded
          </label>
          </div>

          
          <div>
            <input
              className='checkboxInput'
              id="Medium"
              type="checkbox"
              name="congestion"
              value="moderate"
              checked={formData.congestion === "moderate"}
              onChange={handleChange}
            />
            <label htmlFor="Medium">
              Moderate
            </label>
            </div>

            <div>
            <input
              className='checkboxInput'
              id="High"
              type="checkbox"
              name="congestion"
              value="crowded"
              checked={formData.congestion === "crowded"}
              onChange={handleChange}
            />
            <label htmlFor="High">
              Crowded
          </label>
          </div>
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

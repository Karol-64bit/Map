import React, { useState, useEffect } from "react";
import axios from "axios";

const OpinionsManageForm = () => {
  const [data, setData] = useState([]);
  const [editmode, setEditMode] = useState(false); 
  const [editingRecord, setEditingRecord] = useState(0);

  const [content, setContent] = useState("");

  const [searchText, setSearchText] = useState("");
  
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.location_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const api = axios.create({
    baseURL: "http://localhost:5001",
  });

  const handleChange = (event) => {
    setContent(event.target.value);
  };


  const fetchAllOpinions = async () => {
    const request = `http://localhost:5001/api/allopinions`;

    try {
      const response = await fetch(request);
      const jsonData = await response.json();

      setData(jsonData.data);
    } catch (error) {
      console.error("Błąd pobierania danych z API:", error);
    }
  };

  useEffect(() => {
    fetchAllOpinions();
  }, []);

  const handleEdit = (id) => {
    setEditMode(true);
    setEditingRecord(id);

    const selectedRecord = data.find((item) => item.id === id);

    if (selectedRecord) {
      setContent(selectedRecord.content);
    }

  };

  const updateOpinion = async () => {

    try {
      const response = await api.put("api/opinions/"+editingRecord, {content: content});
      console.log("ok")
      setEditMode(false);
      fetchAllOpinions();
    } catch (error) {
      console.log("nie ok");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5001/api/opinions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAllOpinions();
        console.log("fetchAllOpinions")
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
        <h2>List of all opinions</h2>
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
                <th>User name</th>
                <th>Location</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.user_name}</td>
                  <td>{item.location_name}</td>
                  <td>{String(item.content).slice(0, 50)}</td>
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
            <label htmlFor="name">Content:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={content}
              onChange={handleChange}
            />

          <button type="button" onClick={updateOpinion}>Edit</button>
          <button onClick={()=>{setEditMode(false)}}>Cancel</button>
        </form>
      </div>

    )
  }

};

export default OpinionsManageForm;

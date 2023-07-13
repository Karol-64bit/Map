import React, { useState } from "react";
import OpinionsManageForm from "./OpinionsManageForm";
import LocationsManageForm from "./LocationsManageForm";
import AddLocationForm from "./AddLocationForm";
import './AdminPanel.css'


const AdminPanel = () => {
  const [open, setOpen] = useState("addLocationFormView");


  if (open==="addLocationFormView") {
    return (
      <div className="adminPanel">
        <div className="buttonGroup">
          <button className="checked" onClick={()=>{setOpen("addLocationFormView");}}>Add new location</button>
          <button className="unchecked" onClick={()=>{setOpen("manageLocationsView");}}>Manage locations</button>
          <button className="unchecked"onClick={()=>{setOpen("manageOpinionsView");}}>Manage opinions</button>
        </div>
        <AddLocationForm />
      </div>
    );
  }


  if(open==="manageLocationsView"){
    return (
      <div className="adminPanel">
        <div className="buttonGroup">
          <button className="unchecked" onClick={()=>{setOpen("addLocationFormView");}}>Add new location</button>
          <button className="checked" onClick={()=>{setOpen("manageLocationsView");}}>Manage locations</button>
          <button className="unchecked"onClick={()=>{setOpen("manageOpinionsView");}}>Manage opinions</button>
        </div>
        <LocationsManageForm />
      </div>
    );
  }

  if(open==="manageOpinionsView"){
    return (
      <div className="adminPanel">
        <div className="buttonGroup">
          <button className="unchecked" onClick={()=>{setOpen("addLocationFormView");}}>Add new location</button>
          <button className="unchecked" onClick={()=>{setOpen("manageLocationsView");}}>Manage locations</button>
          <button className="checked"onClick={()=>{setOpen("manageOpinionsView");}}>Manage opinions</button>
        </div>
        <OpinionsManageForm />
      </div>
    );
  }

};

export default AdminPanel;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const refee= useRef(null)
  const [edit, setEdit] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    getUserDetails();
    refee.current.focus()
  }, [id,refee]);
  const getUserDetails = async () => {
    const response = await axios.get(`http://localhost:9999/patients/${id}`);
    setEdit(response.data);
    console.log(edit);
  };
  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async (e) =>{
    e.preventDefault();
     await axios.put(`http://localhost:9999/patients/${id}`,edit).catch((errr)=>console.log(errr))
     navigate("/home")
     swal({
        icon:'success',
        title:"update ",
        text:"Patient Detail Updated",
        timer:1500
     })

  }
  const handleBack = () => {
    navigate("/home");
  };
  
  return (
    <div className="Edit-details">
        <h2>Edit Details</h2>
      <form>
        firstName:
        <input
          type="text"
          value={edit.firstName}
          name="firstName"
          onChange={(e) => handleChange(e)}
          ref={refee}
        />
        lastname:
        <input
          type="text"
          value={edit.lastName}
          name="lastName"
          onChange={(e) => handleChange(e)}
        />
        email :
        <input
          type="email"
          value={edit.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handleUpdate(e)} className="btn btn-success">Update</button>
        <button onClick={handleBack}   className="btn btn-info"  >Back</button>
      </form>
    </div>
  );
};

export default Edit;

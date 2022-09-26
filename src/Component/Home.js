import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import List from "./List";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const [addNew, setAddNew] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [status, setStatus] = useState(false);
  const handleInput = (e) => {
    setAddNew({
      ...addNew,
      [e.target.name]: e.target.value,
    });
    console.log(addNew);
  };
  const handleNewEntry = async (e) => {
    e.preventDefault();
    if (!addNew.firstName || !addNew.lastName || !addNew.email) {
      alert("missing input fileds");
    } else {
      await axios
        .post("http://localhost:9999/patients", addNew)
        .catch((err) => console.log(err));
      setStatus(true);
      swal({
        icon: "success",
        title: "Add ",
        text: "New Patient is Add In List",
        timer: 1500,
      });
    }
  };
  if (status) {
    return <Home />;
  }
  return (
    <div>
      {/* add new patient  */}
      <div className="addNew">
        <form>
          <h2>Add New Patient</h2>
          <input
            type="text"
            name="firstName"
            value={addNew.firstName}
            onChange={(e) => handleInput(e)}
            placeholder="Enter First Name...."
          />

          <input
            type="text"
            name="lastName"
            value={addNew.lastName}
            onChange={(e) => handleInput(e)}
            placeholder="Enter Last Name...."
          />
          <input
            type="email"
            name="email"
            value={addNew.email}
            onChange={(e) => handleInput(e)}
            placeholder="Enter Email...."
          />
          <button
            onClick={(e) => handleNewEntry(e)}
            className="btn btn-success"
          >
            {" "}
            Add Patient
          </button>
        </form>
      </div>
      {/* list render */}
      <div>
        <List />
      </div>
      {/* logout button */}
      <button
        className="btn btn-info"
        onClick={() => {
          localStorage.removeItem("token");
          setStatus(true);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;

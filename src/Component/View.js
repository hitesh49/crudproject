import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  useEffect(() => {
    fetchSinglePatient();
  }, []);
  const fetchSinglePatient = async () => {
    const response = await axios.get(`http://localhost:9999/patients/${id}`);
    console.log(response.data);
    setPatient(response.data);
  };
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div className="Viewdetails">
      <table class="table caption-top text-center">
        <caption className="text-center bg-light">
          <h2>View Patient</h2>
        </caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-warning">
            <th scope="row">{patient.id}</th>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.email}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default View;

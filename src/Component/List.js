import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const List = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetchPatients();
  }, []);
  const fetchPatients = async () => {
    const response = await axios
      .get("http://localhost:9999/patients")
      .catch((err) => console.log(err));
    setPatients(response.data);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9999/patients/${id}`);

    const newList = patients.filter((item) => item.id !== id);
    setPatients(newList);
    swal({
      icon: "error",
      title: "Delete",
      text: "One Item deleted",
      timer: 1500,
    });
  };
  return (
    <div>
      <table className="table table-striped table-hover caption-top text-center mt-3">
        <caption className="text-center bg-light">
          <h2>List of Patients</h2>
        </caption>
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            {/* <th>view</th>
            <th>edit</th>
            <th>delete</th> */}
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            <>
              {patients.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/view/${item.id}`}>
                        <button className="btn btn-primary">view</button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/edit/${item.id}`}>
                        <button className="btn btn-info">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={7}>No patient found </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;

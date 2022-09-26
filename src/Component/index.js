import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data.token);
        if (response) {
          navigate("/home");
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((errr) => {
        // alert(errr.response.data.error)
        swal({ icon: "error", text: `${errr.response.data.error}` });
      });
  };
  return (
    <div className="form-style">
      <form>
        <h2>Doctor Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Doctor Email..."
        />
        <label htmlFor="password1">password</label>
        <input
          id="password1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Enter password..."
        />
        <button onClick={handleLogin} className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

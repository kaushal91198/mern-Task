import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Login = (props) => {
  const host = "http://localhost:5000";

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //alert functionality
  const context = useContext(NoteContext);
  const { showAlert } = context;

  const onChange = (e) => {
    // console.log({...state})
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }), // body data type must match "Content-Type" header
    });
    const resData = await response.json();
    console.log(resData);
    if (resData.success) {
      //save the authToken and reDirect to page
      localStorage.setItem("token", resData.authToken);
      showAlert("Login Successfully", "success");
      navigate("../", { replace: true });
    } else {
      showAlert("Invalid Credentails", "danger");
    }
  };
  return (
    <div className="container my-3 bg-success" style={{width:"32vw",border:"solid black"}}>
      <h2>Login to continue to iBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={state.email}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={state.password}
          />
        </div>
        <div className="d-flex justify-content-center my-2">
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

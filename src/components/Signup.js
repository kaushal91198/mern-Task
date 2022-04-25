import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Signup = (props) => {
  const host = "http://localhost:5000";

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { showAlert } = context;

  const onChange = (e) => {
    // console.log({...state})
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.cpassword) {
      showAlert("Password and Confirm Password do not match.", "danger");
      return;
    }

    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }), // body data type must match "Content-Type" header
    });
    const resData = await response.json();
    if (resData.errors) {
      //save the authToken and reDirect to page
      showAlert(resData.errors[0].msg, "danger");
    } else {
      showAlert("Suceessfully created your account", "success");
      navigate("../login", { replace: true });
    }
  };

  return (
    <div className="container my-3 bg-success" style={{width:"41vw",border:"solid black"}}>
      <h2>Create account to continue to iBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
            name="name"
            onChange={onChange}
            value={state.name}
            minLength={3}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
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
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={onChange}
            value={state.cpassword}
            minLength={5}
            required
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

export default Signup;

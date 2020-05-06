import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";

const Signup = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: null,
  });

  const { email, password } = state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: "" });
    try {
      await signup(email, password);
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
      {state.error ? <p className='alert alert-warning'>{state.error}</p> : null}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>
            Sign Up to <Link to="/">MeChat</Link>
          </h1>
          <p>Fill in the form below to login to your account.</p>
          <div className="form-group">
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={state.email}
              className="form-control w-100"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={state.password}
              type="password"
              className="form-control w-100"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-warning btn-block">
              Login
            </button>
          </div>
          <hr />
          <p>
            Already Have Account ? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

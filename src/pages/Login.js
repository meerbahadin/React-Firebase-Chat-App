import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: "" });
    try {
      await signin(state.email, state.password);
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  const handleChange = async (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };
  return (
    <div className="row">
      <div className="col-lg-8">
      {state.error ? <p className='alert alert-warning'>{state.error}</p> : null}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>
            Login to <Link to="/">MeChat</Link>
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
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
      <div className='col-lg-4 mt-4'>
      <h5>You Can Also Login With Github Or Google Account</h5>
      <hr/>
        <button onClick={googleSignIn} className="btn btn-primary w-100">Login With Google Account</button>
        <button onClick={githubSignIn} className="btn btn-secondary w-100 mt-3">Login With Github Account</button>
        </div>
    </div>
  );
};

export default Login;

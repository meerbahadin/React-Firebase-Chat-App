import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

const Home = (props) => {
  return (
    <Fragment>
      <div class="jumbotron-fluid">
        <h1 class="display-4">Welcome To MeChat</h1>
        <p class="lead">
         Real time chat based on firebse and react.
        </p>
        <hr class="my-4" />
        <p>
         This project is open source and its for learning purpose only dont insert sentitive information in this demo.
        </p>
        <p class="lead">
          <Link class="btn btn-success btn-lg" to='/login' role="button">
            Log In Into Your Account
          </Link>
          <Link class="btn btn-warning btn-lg" to='/signup' role="button">
          Sign Up If You Dont Have An Account
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Home;

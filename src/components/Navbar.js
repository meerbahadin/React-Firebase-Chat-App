import React, { useState, Fragment } from "react";
import { auth } from "../services/firebase";
import {Link} from 'react-router-dom';

const Navbar = ({ user }) => {
  const logOut = () => {
    auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-default bg-default">
      <Link class="navbar-brand" to="/" className="text-white">
        MeChat
      </Link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          {user !== null && (
            <Fragment>
              <a class="nav-item nav-link disabled" href="#">
                Logged In As <strong>{user != null && user.email}</strong>
              </a>
              <a class="nav-item nav-link active" href="#" onClick={logOut}>
                Logout
              </a>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

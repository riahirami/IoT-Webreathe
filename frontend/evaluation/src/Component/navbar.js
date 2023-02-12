import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  function Navbar() {
 
    return (
      <div className="justify-content-center">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top " >
        
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">

            <Link className="nav-link" to="home">
                  Home 
                </Link>
</li>
              <li className="nav-item">
                <Link className="nav-link" to="moduleslist">
                  Modules list 
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="addmodules">
                  Add modules 
                </Link>
              </li>
            
              
            </ul>
          </div>
        </nav>
      </div>
    );
  }


export default Navbar;

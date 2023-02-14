import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="justify-content-center">
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <a className="nav-link" href="#">
                  <div className="sb-nav-link-icon">
                    <i className="fa fa-home"></i>
                  </div>
                  <Link className="nav-link" to="home">
                  Home 
                </Link>
                </a>
                <a className="nav-link" href="#">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <Link className="nav-link" to="moduleslist">
                  Modules list 
                </Link>
                </a>
               
                <a className="nav-link" href="index.html">
                  <div className="sb-nav-link-icon">
                    <i className="fa fa-plus-circle"></i>
                  </div>
                  <Link className="nav-link" to="addmodules">
                  Add modules 
                </Link>
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              WeBreathe_Iot
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

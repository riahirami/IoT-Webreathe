import React, { Component, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";


function AddModules() {
  const url = "http://localhost:8000/api/iotmodules";
  const [dataModules, setDataModules] = useState({
    Name: "",
    Status: "",
    Type: "",
    Value: "",
  });
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        name: dataModules.Name,
        status: dataModules.Status,
        type: dataModules.Type,
        value: dataModules.Value,
      })
      .then((res) => {
        console.log(" modules added ");
      })
      .then((res) => {
        Modal.success({
          title: "Modules added ",
          okText: "Ok",
          okType: "success",
          onOk: () => {
            
            navigate("/moduleslist");
          },
        });
      })
      
  }
  function handle(e) {
    const newData = { ...dataModules };
    newData[e.target.id] = e.target.value;
    setDataModules(newData);
    console.warn(dataModules);
  }

  return (
    <>
    <div className="col-md-4">

    </div>
      <h2> Add modules</h2>
    <div className="col-md-12 container" style={{ paddingTop: "50px" }}>
      <form onSubmit={(e) => submit(e)}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example3">
            Name
          </label>
          <input
            type="text"
            id="Name"
            className="form-control"
            onChange={(e) => handle(e)}
            value={dataModules.Name}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example4">
            Status
          </label>
          <input
            className="form-control"
            type="text"
            id="Status"
            onChange={(e) => handle(e)}
            value={dataModules.Status}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example3">
            type
          </label>
          <input
            type="text"
            id="Type"
            className="form-control"
            onChange={(e) => handle(e)}
            value={dataModules.Type}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example3">
            Value
          </label>
          <input
            type="text"
            id="Value"
            className="form-control"
            onChange={(e) => handle(e)}
            value={dataModules.Value}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Add modules
        </button>
      </form>
    </div>

        </>

  );
}

export default AddModules;

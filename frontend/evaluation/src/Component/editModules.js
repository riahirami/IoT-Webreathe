import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "antd";
const baseURL = "http://localhost:8000/api/iotmodules/";

function EditModule(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    status: "",
    type: "",
    value: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/iotmodules/"+id).then((res) => {
      setData(res.data);
      console.log("ok module : "+id)
      
    });
  }, []);

  function submit(e) {
    e.preventDefault();
    
    axios.put(`http://localhost:8000/api/iotmodules/${id}`, data)
    .then((res) => {
        Modal.success({
          title: "Module " +data.name+ " updated ",
          okText: "Ok",
          okType: "success",
          onOk: () => {
            
            navigate("/moduleslist");
          },
        });
      });
    console.warn("updating ....");
    
  }

  function handle(e) {
    
    const newData = { 
        name : data.name,
        status : data.status,
        type : data.type,
        value: data.value
     };
     
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <>
      <div className="col-md-4"></div>
      <h1> Update user</h1>
      <div className="col-md-8 offset-md-2" style={{ paddingTop: "100px" }}>
        <form onSubmit={(e) => submit(e)}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example3">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              onChange={(e) => handle(e)}
              value={data.name}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example4">
              Status
            </label>
            <input
              className="form-control"
              type="text"
              id="status"
              onChange={(e) => handle(e)}
              value={data.status}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example3">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="form-control"
              onChange={(e) => handle(e)}
              value={data.type}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example3">
              Value
            </label>
            <input
              type="text"
              id="value"
              className="form-control"
              onChange={(e) => handle(e)}
              value={data.value}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Edit module
          </button>
        </form>
      </div>
    </>
  );
}

export default EditModule;

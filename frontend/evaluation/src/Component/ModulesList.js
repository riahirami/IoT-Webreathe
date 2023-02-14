import axios, { formToJSON } from "axios";
import { React, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://localhost:8000/api";

function ModulesList() {
  const [modules, setModules] = useState([]);
  const [data, setData] = useState({
    name: "",
    status: "",
    type: "",
    value: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getModules();
  }, []);

  function getModules() {
    axios.get(baseURL+"/iotmodules").then((response) => {
      setModules(response.data["hydra:member"]);
    });
  }

  function getHistory(id) {
    axios.get(baseURL+"/iotmodules/" + id).then((response) => {
      navigate("/history/" + id);
    });
  }

  setInterval(() => {
    simulateAll();
  }, 60 * 10000);

  function simulateAll() {
    axios
      .post(baseURL+"/simulateall", {
        status: data.status,
        value: data.value,
        // module: id,
        type: data.type,
      })
      .then((res) => {
        console.log(" simulation success ");
        toast("Simulation ...");
      });
  }

  function simulateIot(id) {
    toast("Simulation ...");

    axios
      .post(baseURL+"/simulateiot/"+id, {
        status: data.status,
        value: data.value,
        module: id,
        type: data.type,
      })
      .then((res) => {
        console.log(" simulation success ");
        Modal.success({
          title: "Simulation effectued & history updated ",
          okText: "Ok",
          okType: "success",
          onOk: () => {
            navigate("/moduleslist");
          },
        });
      });
  }

  const updateModules = async (id) => {
    console.warn("id= " + id);
    navigate("/editmodule/" + id);
  };

  function deleteModules(id) {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        axios.delete(baseURL+"/iotmodules/" + id).then(() => {
          getModules();
          navigate("/moduleslist");
          console.log("delete user :  " + id);
        });
      },
    });
  }

  if (!modules) return null;
  return (
    <div className="Container-fluid">
      <h1>Modules list</h1>
      <div className="col-md-4"></div>
      <div className="col-md-12 container" style={{ paddingTop: "50px" }}>
        <button
          className="btn btn-warning text-light"
          onClick={() => simulateAll()}
        >
          Simulation
        </button>
        <table className="table table-striped">
          <thead className="bg-dark text-light text-center ">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">type</th>
              <th scope="col">value</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr className="text-center" key={module.id}>
                <th key={module.id} scope="row">
                  {module.id}
                </th>
                <td>{module.name}</td>
                <td>{module.status}</td>
                <td>{module.type}</td>
                <td>{module.value}</td>
                <td>
                  <button
                    className="btn btn-dark text-light"
                    onClick={() => {
                      simulateIot(module.id);
                    }}
                  >
                    Simulate
                  </button>
                  <button
                    className="btn btn-success text-light"
                    onClick={() => getHistory(module.id)}
                  >
                    History
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteModules(module.id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-primary text-light"
                    onClick={() => updateModules(module.id)}
                  >
                    update
                  </button>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5017}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModulesList;

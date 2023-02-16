import axios, { formToJSON } from "axios";
import { React, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const baseURL = "http://localhost:8000/api";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: false,
      text: 'Modules values',
    },
  },
};

function ModulesList() {
  const [modules, setModules] = useState([]);
  const [data, setData] = useState(modules);

  const labels = Array.from(modules).map((module) => module.name);

  const dat = {
    labels,
    datasets: [
      {
        label: "value",
        data: Array.from(modules).map((module) => module.value),
        borderColor: 'rgb(30,144,255)',
        backgroundColor: 'rgba(30,144,255, 0.5)',
      }
     
    ],
  };


  const navigate = useNavigate();

  useEffect(() => {
    getModules();
    
  }, [modules]);

  useEffect(() => {
    checkOffModules();
  }, []);

  function updateData(updatedModule) {
    const newData = [...data];
    const moduleIndex = newData.findIndex(
      (module) => module.name === updatedModule.name
    );
    if (moduleIndex !== -1) {
      newData[moduleIndex].value = updatedModule.value;
      newData[moduleIndex].time = new Date().toLocaleTimeString();
      setData(newData);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedModule = {
        name: modules.name,
        value: modules.value,
      };
      updateData(updatedModule);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // afficher tout les modules existante dans la base de donnée
  function getModules() {
    axios.get(baseURL + "/iotmodules").then((response) => {
      setModules(response.data["hydra:member"]);
    });
  }
  // afficher l'historique des valeurs et d'états des modules
  function getHistory(id) {
    axios.get(baseURL + "/iotmodules/" + id).then((response) => {
      navigate("/history/" + id);
    });
  }

  // fonction qui verifier les modules en status "off" pour afficher une notifications
  function checkOffModules() {
    axios.get(baseURL + "/modules/off/").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        toast("Modules " + response.data[i].name + " is off !");
      }
    });
  }

  // un appel au fonction de simulation chaque 10min mais
  setInterval(() => {
    simulateAll();
  }, 60 * 100000);

  //une fonction qui fais changer les valeurs et les status de tout les modules aléatoirement
  function simulateAll() {
    axios
      .post(baseURL + "/simulateall", {
        status: data.status,
        value: data.value,
        // module: id,
        type: data.type,
      })
      .then((res) => {
        console.log(" simulation success ");
        checkOffModules();

        toast("Simulation for all modules ...");
      });
  }

  // une fonction pour changer les valeur et le statut du modul qui correspond à l'id passé en paramétres
  function simulateIot(id) {
    toast("Executing simulation ...");

    axios
      .post(baseURL + "/simulateiot/" + id, {
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
            checkOffModules();
          },
        });
      });
  }

  // fonction du modification du module
  const updateModules = async (id) => {
    console.warn("id= " + id);
    navigate("/editmodule/" + id);
  };

  // fonction pour supprimer une modules qui exige de valdier la suppression pour l'effectuer
  function deleteModules(id) {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        axios.delete(baseURL + "/iotmodules/" + id).then(() => {
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
      <h2>Modules list</h2>
      <div className="col-md-4"></div>
      <div className="col-md-12 container" style={{ paddingTop: "50px" }}>
        <button
          className="btn btn-warning text-light"
          onClick={() => simulateAll()}
        >
          {" "}
          <i className="fa fa-random" aria-hidden="true"></i>
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
                    className="btn btn-primary text-light"
                    onClick={() => {
                      simulateIot(module.id);
                    }}
                    alt="test"
                  >
                    <i className="fa fa-random" aria-hidden="true">
                      Simulate
                    </i>
                  </button>
                  <button
                    className="btn btn-info text-light"
                    onClick={() => getHistory(module.id)}
                  >
                    <i className="fa fa-history" aria-hidden="true">
                      History
                    </i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteModules(module.id)}
                  >
                    <i className="fa fa-times" aria-hidden="true">
                      delete
                    </i>
                  </button>
                  <button
                    className="btn btn-dark text-light"
                    onClick={() => updateModules(module.id)}
                  >
                    <i className="fa fa-pencil-square" aria-hidden="true">
                      update
                    </i>
                  </button>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
      <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area me-1"></i>
                                Area Chart
                            </div>
                            <div class="card-body">
                            <Line options={options} data={dat} />
                              </div>
                            <div class="card-footer small text-muted"></div>
                        </div>
      </div>
     
    </div>
  );
}

export default ModulesList;

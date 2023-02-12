import axios, { formToJSON } from "axios";
import {React, useEffect,useState} from "react";
import {Modal,Input } from "antd";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8000/api/iotmodules/";

function ModulesList() {
  const [modules, setModules] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getModules();
  }, []);

  function getModules(){
    axios.get(baseURL).then((response) => {
      setModules(response.data["hydra:member"]);
    });
  }

  function getHistory(id) {
    axios.get(baseURL+id).then((response) => {
      navigate('/history/'+id)
    });
  }

  
  const updateModules= async (id) => {
    console.warn("id= "+id)
    navigate('/editmodule/'+id)
    
}

  function deleteModules(id) {
    Modal.confirm({
      title:"Do you want to delete this user ?",
      okText:"Yes",
      okType:"danger",
      cancelText:"No",
      onOk:()=>{
    axios.delete(`http://localhost:8000/api/iotmodules/${id}`)
     .then(()=>{

       getModules();
       navigate("/moduleslist");
       console.log("delete user :  " +id)
    })
  }
})

}

  if (!modules) return null;
  return (
    <div className="Container-fluid">
      <h1>Modules list</h1>
    <div className="col-md-4">

    </div>
    <div className="col-md-12 container" style={{ paddingTop: "50px" }}>        
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
              <tr className="text-center">
                <th           key={module.id} scope="row">{module.id}</th>
                <td>{module.name}</td>
                <td>{module.status}</td>
                <td>{module.type}</td>
                <td>{module.value}</td>
                <td>
                  <button className="btn btn-success text-light" onClick={()=>getHistory(module.id)}>History</button>
                <button className="btn btn-danger" onClick={()=>deleteModules(module.id)}>delete</button>
                <button className="btn btn-primary text-light" onClick={()=>updateModules(module.id)}>update</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModulesList ;
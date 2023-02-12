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

  

 

  return (
    <>
      <div className="col-md-4"></div>
      <h1> Update user</h1>
      <div className="col-md-8 offset-md-2" style={{ paddingTop: "100px" }}>
      <ul>
      <li>{data.id}</li>
      <li>{data.module}</li>
      <li>{data.status}</li>
      <li>{data.value}</li>
      <li>{data.timestamp}</li>

      

      </ul>
      </div>
    </>
  );
}

export default EditModule;

import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "antd";
const baseURL = "http://localhost:8000/api/iotmodules/";

function History(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    status: "",
    type: "",
    value: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/historyofmodule/" + id).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <div className="col-md-12" style={{ paddingTop: "100px" }}>
        <h1> History </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">timestamp</th>
              <th scope="col">type</th>
              <th scope="col">status</th>
              <th scope="col">value</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(data).map((histo) => {
              return (
                <tr key={histo.id}>
                  <td scope="row">{histo.id}</td>
                  <td> {histo.timestamp.date}</td>
                  <td>{histo.type}</td>
                  {histo.status == "off" ? (
                    <td className=" text-white bg-danger">{histo.status}</td>
                  ) : (
                    <td className=" text-white bg-success">{histo.status}</td>
                  )}
                  <td>{histo.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default History;

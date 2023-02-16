import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
const baseURL = "http://localhost:8000/api/iotmodules/";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: false,
      text: 'Modules Values history',
    },
  },
};


function History(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    status: "",
    type: "",
    value: "",
  });
  const labels = Array.from(data).map((module) => formatDate(module.timestamp.date));;

  const dat = {
    labels,
    datasets: [
      {
        label: "value",
        data: Array.from(data).map((module) => module.value),
        borderColor: 'rgb(30,144,255)',
        backgroundColor: 'rgba(30,144,255, 0.5)',
      }
     
    ],
  };
  useEffect(() => {
    axios.get("http://localhost:8000/api/historyofmodule/" + id).then((res) => {
      setData(res.data);
      Array.from(data).map((histo) => {
        
        
        console.log(histo);
        // console.log(formatDate(histo.timestamp.date));
      })
    });
  }, []);

  // une fonction pour formatter l'affichage des valeurs du variable timestamp

  function formatDate(date) {
    
      const originalDate = date;
      const formattedDate = new Date(originalDate).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      return formattedDate ;
    
    
  }
 

  return (
    <>
        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area me-1"></i>
                                History Chart 
                            </div>
                            <div class="card-body">
                            <Line options={options} data={dat} />

                              </div>
                            <div class="card-footer small text-muted"></div>
                        </div>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Time</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(data).map((histo) => {
              return (
                <tr key={histo.id}>
                  <td scope="row">{histo.id}</td>
                  <td> {formatDate(histo.timestamp.date)}</td>
                  <td>{histo.type}</td>
                  {histo.status == "off" ? (
                    <td className=" text-white bg-danger">{histo.status}</td>
                  ) : (
                    <td className=" text-white bg-info">{histo.status}</td>
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

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Route, Routes, Switch } from "react-router-dom";

import Navbar from "./Component/navbar";
import ModulesList from "./Component/ModulesList";
import AddModules from "./Component/AddModules";
import HomeComponent from "./Component/home";
import EditModule from "./Component/editModules";
import History from "./Component/history";

function App() {
  return (
    <div className="Container-fluid">
      <Navbar />
       
      
        <Routes>
          <Route path="/" element={<HomeComponent/>} />
          <Route path="/home" element={<HomeComponent/>} />
          <Route path="/moduleslist" element={<ModulesList/>} />
          <Route path="/AddModules" element={<AddModules/>} />
          <Route path="/editmodule/:id" element={<EditModule/>} />
          <Route path="/history/:id" element={<History/>} />
        </Routes>
      

    </div>
  );
}

export default App;

import "./App.css";
import {useState} from "react"
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Report from "./pages/Report";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [uploaded,setUploaded]=useState(false);
  const [result,setresult]=useState(false);
  return (
    <>
      <div className="relative w-screen h-screen min-h-screen overflow-x-hidden">
        <Navbar uploaded={uploaded} result={result} setUploaded={setUploaded} />
        <Routes>
          <Route path="/" element={<Home setUploaded={setUploaded} setresult={setresult} />} />
          <Route path="/report" element={<Report  />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

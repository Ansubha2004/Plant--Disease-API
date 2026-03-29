import './App.css'
import {Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Report from "./pages/Report"

function App() {

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/report" element={<Report/>} />
      </Routes>
    </div>
  )
}

export default App

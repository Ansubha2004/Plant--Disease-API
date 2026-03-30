import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {failure} from "../utils/notify.js"

function Navbar({uploaded,setUploaded,result}) {

  const handleClick=()=>{
    if(!uploaded)
      failure("Please select an image first.");
    else
    {
      if(!result)
        failure("Unable to redirect due to failure to analyze image")
    }
    
  }


  return (
    <nav className="px-5 py-2 bg-[#F9F9F8] fixed top-0 z-[4] flex justify-between items-center h-auto w-full  ">
      <img src={logo} className="h-12" />
      <div className="text-[#57534E] text-[1rem] gap-10 flex manrope">
        <NavLink
          to="/"
          onClick={()=>setUploaded(false)}
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Home
        </NavLink>
        
        <NavLink to="/contributors" className={({ isActive }) => (isActive ? "linkanimate" : "")}>Contributors</NavLink>
      </div>
      <NavLink onClick={handleClick} to={uploaded && result ?"/report":"/"} className={clsx("manrope text-[1rem] px-8 rounded-[12px] text-white py-1 bg-[#012D1D] ",uploaded&&result?"cursor-pointer buttonanimate":"cursor-not-allowed")}>
        Report
      </NavLink>
      
    </nav>
  );
}

export default Navbar;

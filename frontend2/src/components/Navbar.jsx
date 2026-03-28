import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function Navbar() {
  return (
    <nav className="px-5 py-2 bg-transparent sticky top-0 z-[4] flex justify-between items-center h-auto w-full  ">
      <img src={logo} className="h-10" />
      <div className="text-[#57534E] text-[1rem] gap-10 flex">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Home
        </NavLink>
        <NavLink to="/work" className={({ isActive }) => (isActive ? "linkanimate" : "")}>How It Works</NavLink>
        <NavLink to="/contributors" className={({ isActive }) => (isActive ? "linkanimate" : "")}>Contributors</NavLink>
      </div>
      <NavLink to="/report" className="text-[1rem] px-8 rounded-[12px] text-white py-1 bg-[#012D1D] buttonanimate">
        Report
      </NavLink>
    </nav>
  );
}

export default Navbar;

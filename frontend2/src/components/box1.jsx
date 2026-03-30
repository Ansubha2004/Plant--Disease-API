import React from "react";
import leafbg from "../assets/leafbg.png";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function box1() {
  return (
    <div className="relative mt-[100px] px-15 rounded-[30px] box-border bg-[#E6F4EC]/90 bg-blur-sm flex flex-col justify-center items-start w-full h-[60vh]  ">
      <p className="italic leading-[60px] text-[#012D1D99] notoserif text-[2.9rem] ">
        Cultivating <span className="text-[#012D1D]">Precision Care</span>
      </p>
      <br />
      <br />
      <p className="manrope text-[#012D1DCC] text-[0.9rem] w-[60%]">
        Turning complex leaf imagery into instant agricultural solutions. We are
        dedicated to ensuring global food security by making rapid, automated
        plant diagnostics accessible to everyone, everywhere.
      </p>
      <br />
      <br />
      <NavLink
        to="/"
        onClick={() => {
          setTimeout(() => {
            const section = document.getElementById("product");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }}
        className={clsx(
          "manrope text-[1rem] px-8 rounded-[12px] text-white py-2 bg-[#012D1D] ",
        )}
      >
        Try Our Product
      </NavLink>
      <img src={leafbg} className="h-full absolute right-0" />
    </div>
  );
}

export default box1;

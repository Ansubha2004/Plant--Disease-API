import React from 'react'
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";

function Homebg() {
  return (
    <div id="background" className="fixed top-0 w-screen h-screen bg-[#F9F9F8] text-white">
        <img src={bg1} className="absolute bottom-0" />
        <img src={bg2} className="absolute top-20 scale-[0.79]" />

      </div>
  )
}

export default Homebg
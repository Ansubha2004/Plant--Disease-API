import React, { useEffect } from "react";
import ansubha from "../assets/members/ansubha.png";
import adipto from "../assets/members/adipto.png";
import anushka from "../assets/members/anushka.png";
import anish from "../assets/members/anish.png";
import manoj from "../assets/members/manoj.png";
import mrinmoy from "../assets/members/mrinmoy.png";
import clsx from "clsx";
import Box1 from "../components/box1.jsx";
import bg from "../assets/bg3.png"

function Contributors({setUploaded}) {

  useEffect(()=>{
    setUploaded(false);
  },[])

  
  const members = [
    {
      name: "Adipto Purakayastha",
      role: "designer",
      description:
        "Sculpting the visual identity and user experience to make complex plant diagnostics feel effortless.",
      image: adipto,
    },
    {
      name: "Anish Ghosh",
      role: "Ai developer",
      description:
        "Architecting the neural networks and deep learning models that power our real-time detection.",
      image: anish,
    },
    {
      name: "Ansubha Dhar",
      role: "front-end Developer",
      description:
        "Translating intricate code into a seamless, high-performance interface for growers everywhere.",
      image: ansubha,
    },
    {
      name: "Manoj Ghosh",
      role: "poster maker",
      description:
        "Synthesizing research data into compelling visual narratives and technical documentation.",
      image: manoj,
    },
    {
      name: "Anushka Lahiri",
      role: "SPOKESPERSON & Poster Documentation",
      description:
        "Defining our voice and ensuring our mission to digitize plant care reaches the global stage.",
      image: anushka,
    },
    {
      name: "Mrinmoy Haldar",
      role: "Moral Support",
      description:
        "Mastering the essential craft of being present without the unnecessary complication of participation.",
      image: mrinmoy,
    },
  ];

  return (
    <section className="relative w-full bg-[#F9F9F8] z-[1] h-auto">
     
      <div className="relative w-screen px-[5%] box-border    h-auto z-[5]">
        <Box1 />
        
        
        <div className="w-full translate-y-[75px] text-center flex flex-col gap-3 items-center">
          <p className="italic leading-[60px] text-[#012D1D99] notoserif text-[2.9rem] ">
            Our <span className="text-[#012D1D]">Team Members</span>
          </p>
          <div className="bg-[#012D1D] h-[4px] w-37"></div>
        </div>
        <br />
        <br />
        <div className="flex translate-y-[72px] w-full flex-wrap justify-between items-center  ">
          {
            members.map((member,index)=>(
              <div key={index} className="w-[26%] scale-[0.9] ">
                <img src={member.image} className="w-full" />
                <p className="uppercase text-[0.7rem] manrope1 my-3 translate-y-1  leading-[10px]  text-[#406749]">{member.role}</p>
                <p className="notoserif text-[1.5rem] text-[#012D1D] ">{member.name}</p>
                <p className="manrope text-[#414844] text-[0.7rem] leading-[30px]">{member.description}</p>
              </div>
            ))
          }
        </div>
        
      </div>
      <img src={bg} className="" />
    </section>
  );
}

export default Contributors;

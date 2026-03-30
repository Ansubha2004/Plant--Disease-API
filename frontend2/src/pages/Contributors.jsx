import React from "react";
import Homebg from "../components/Homebg.jsx";
import ansubha from "../assets/members/ansubha.png";
import adipto from "../assets/members/adipto.png";
import anushka from "../assets/members/anushka.png";
import anish from "../assets/members/anish.png";
import manoj from "../assets/members/manoj.png";
import mrinmoy from "../assets/members/mrinmoy.png";
import clsx from "clsx"
import Box1 from "../components/box1.jsx"

function Contributors() {
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
    <section className="relative w-full z-[1] h-auto">
      <Homebg />
      <div className="relative w-screen px-[5%] box-border   h-auto z-[5]">
        <Box1 />
      </div>
    </section>
  );
}

export default Contributors;

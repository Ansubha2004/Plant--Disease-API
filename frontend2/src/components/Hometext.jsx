import React from "react";

function Hometext() {
  return (
    <div className=" mt-[70px] flex flex-col justify-center items-center w-screen h-[50vh] text-center">
      <p className="text-[0.8rem] text-[#414844] manrope tracking-[2.8px] ">
        DIAGONOSTICS
      </p>
      <p className="text-[3rem] leading-11 text-[#012D1D99] notoserif my-3 ">
        Reveal the health of <br /> your{" "}
        <span className="text-[#012D1D] italic ">green companions.</span>
      </p>
      <p className="text-[0.8rem] text-[#414844] manrope">
        Our advanced neural network analyzes leaf patterns to identify <br />
        deficiencies, pests, and diseases in seconds.
      </p>
    </div>
  );
}

export default Hometext;

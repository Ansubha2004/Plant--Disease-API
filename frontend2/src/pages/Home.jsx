import React from "react";
import Homebg from "../components/Homebg.jsx";
import Hometext from "../components/Hometext.jsx";
import imageuploadlogo from "../assets/imageuploadlogo.png";
import camera from "../assets/camera.png";
import sample1  from "../assets/sample1.png";
import sample2 from "../assets/sample2.png";
import sample3 from "../assets/sample3.png";
import sample4 from "../assets/sample4.png";

function Home() {

  const samples=[sample1,sample2,sample3,sample4]

  return (
    <section className="relative w-full z-[1] h-auto">
      <Homebg />
      <div className="relative w-screen h-auto  z-[5] ">
        <Hometext />
        <br />
        <br />
        <div className="px-30 w-full flex justify-center  gap-6 mb-20 ">
          <div className="w-2/3  py-[60px] border-dashed rounded-[10px] border-[#C1C8C24D] bg-white/70 border-[3px] flex flex-col justify-center items-center backdrop-blur-sm">
            <img src={imageuploadlogo} className="h-20" />
            <p className="text-[1.3rem] font-[Noto_Serif] text-[#012D1D] my-2">
              Upload leaf imagery
            </p>
            <p className="text-center text-[0.9rem] font-[Manrope] text-[#414844] leading-4">
              Drag and drop high-resolution photos or
              <br />
              browse your local files.
            </p>
            <br />

            <form className=" flex justify-center gap-2 cursor-pointer mt-2">
              <input type="file" accept="image/*" className=" bg-[#E7E8E7] text-[#012D1D] px-3 py-2 rounded-lg buttonanimate" />
              <button className="flex gap-2 items-center bg-[#012D1D] text-white px-7 py-2 rounded-lg buttonanimate">
                <img src={camera} className="h-[1rem]" />
                Analyse Image
              </button>
            </form>

            <p className="mt-3 uppercase text-[0.6rem] text-[#717973]">
              Supported: JPG, PNG, HEIC (Max 15MB)
            </p>
          </div>
          <div className="flex-1 flex flex-col  box-border p-[30px] rounded-[15px] bg-[#F3F4F395] backdrop-blur-sm">
            <p className="font-[Noto_serif] text-[1.2rem] text-[#012D1D]">Test the system</p>
            <p className="text-[#414844] text-[0.8rem] leading-4">
              Don't have a photo ready? Use one of our carefully curated samples
              to see how the analysis works.
            </p>
            <br />
            <div className="flex w-full flex-wrap justify-center items-center gap-5 ">
              {
                  samples.map((sample,index)=>(
                    <a className="w-[44%] hover:scale-[1.05] transition-all ease-in-out  " href={sample} download>
                      <img src={sample} alt="" />
                    </a>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

import React, { useState } from "react";
import sample2 from "../assets/sample2.png";
import { HeartPulse, ShieldPlus, TriangleAlert } from "lucide-react";
import clsx from "clsx"

function Report() {
  const [pointer, setPointer] = useState(0);

  const handleclick=(i)=>{
    setPointer(i);
  }

  const reports = [
    {
      heading: "Disease Analysis",
      paragraph: `Tomato Septoria leaf spot - a common fungal disease that can cause
              significant damage to your tomato crop. Don't worry, I'm here to
              help you tackle this issue. Tomato Septoria leaf spot is caused by
              the fungus Septoria lycopersici. It thrives in warm, humid
              environments and can spread quickly through splashing water,
              contaminated soil, and infected debris. The disease typically
              starts with small, circular spots on the lower leaves, which can
              eventually merge to form larger blighted areas.`,
      icon: <TriangleAlert size={40} color="#012D1D" />,
    },
    {
      heading: "Immediate Treatment",
      paragraph: `To manage Tomato Septoria leaf spot, begin by carefully removing all infected leaves from the plant and disposing of them properly to prevent further spread. It is important to disinfect pruning tools after each use to avoid transferring the fungus to healthy parts of the plant. Applying appropriate fungicides such as chlorothalonil or copper-based products can help control the disease; ensure that you follow the instructions on the product label for safe and effective use. Additionally, reduce excess moisture around the plant by avoiding overhead watering and instead watering at the base to limit conditions that favor fungal growth.`,
      icon: <HeartPulse size={40} color="#012D1D" />,
    },
    {
      heading: "Preventive Measures",
      paragraph: `Preventing Tomato Septoria leaf spot involves maintaining good plant hygiene and optimal growing conditions. Ensure proper spacing between plants, typically around 2–3 feet, to promote adequate air circulation and reduce humidity levels. Avoid water splashing onto leaves by using drip irrigation methods and applying mulch to the soil surface. Regularly remove weeds and plant debris, especially after harvesting, as they can harbor the fungus. Practicing crop rotation by not planting tomatoes in the same soil repeatedly can further reduce the risk of infection. Frequent monitoring of plants, especially the lower leaves, helps in early detection and timely intervention.`,
      icon: <ShieldPlus size={40} color="#012D1D" />,
    },
  ];

  return (
    <section
      id="report"
      className="px-[6%] py-20 box-border bg-[#F9F9F8] relative w-screen min-h-screen z-[2] h-auto"
    >
      <div className="flex w-full h-auto justify-between items-end ">
        <div>
          <p className="text-[0.8rem] text-[#414844] font-[Instrument_Sans] mb-2">
            DIAGONASTIC REPORT
          </p>
          <p className="text-[3.6rem] leading-[3.6rem] text-[#012D1D] font-[Noto_Serif]">
            Powdery Mildew
          </p>
          <p className="text-[3.6rem] leading-[3.6rem] font-[Noto_Serif] italic text-[#406749]">
            Detected
          </p>
        </div>
        <div className="bg-[#E7E8E7] py-1 pl-4 pr-2 box-border rounded-[15px] flex items-center">
          <p className="w-1/2 text-[12px] text-[#414844]  leading-3">
            HEALTH SCORE
          </p>
          <p className="text-[#BA1A1A] text-[1.5rem] font-[Noto_Serif]">45%</p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex w-full h-auto justify-between gap-10">
        <div className="relative w-2/5 ">
          <img src={sample2} className="w-full" />
          <div className="absolute bottom-5 left-5 text-[0.7rem] border-[1px] border-[#012D1D] py-1 px-3 rounded-full z-[2] bg-[#FFFFFFE5] text-[#012D1D] text-center">
            AI Analysis...
          </div>
        </div>
        <div className="flex-1 bg-white rounded-[20px] box-border p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-[2rem] italic font-[Noto_Serif] text-[#012D1D] ">
                {reports[pointer].heading}
              </p>
              {reports[pointer].icon}
            </div>
            <br />
            <p className="text-[#414844] text-justify leading-5">
              {reports[pointer].paragraph}
            </p>
          </div>
          <div className="flex gap-2 mt-6">
            {reports.map((report, index) => (
              <button
                key={index}
                onClick={()=>handleclick(index)}
                className={clsx("buttonanimate text-[0.7rem] px-5 py-2 rounded-lg",pointer===index?"bg-[#012D1D] text-white":"bg-[#E7E8E7] text-[#012D1D]")}
              >
                {report.heading}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Report;

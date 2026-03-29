import React, { useState } from "react";
import sample2 from "../assets/sample2.png";
import {
  HeartPulse,
  ShieldPlus,
  TriangleAlert,
  MessageCircle,
  X,
  Send,
  Leaf,
} from "lucide-react";
import clsx from "clsx";

function Report() {
  const [pointer, setPointer] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  const handleclick = (i) => {
    setPointer(i);
  };

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
      className="px-[6%] pt-20 pb-20  box-border bg-[#F9F9F8] relative w-full max-w-full min-w-0 min-h-screen z-[2] h-auto overflow-x-hidden"
    >
      <div className="flex w-full h-auto flex-col gap-6 sm:flex-row sm:justify-between sm:items-end">
        <div className="min-w-0">
          <p className="text-[0.8rem] text-[#414844] font-[Instrument_Sans] mb-2">
            DIAGONASTIC REPORT
          </p>
          <p className="text-[2rem] leading-[1.05] sm:text-[2.75rem] sm:leading-none md:text-[3.6rem] md:leading-[3.6rem] text-[#012D1D] font-[Noto_Serif] break-words">
            Powdery Mildew
          </p>
          <p className="text-[2rem] leading-[1.05] sm:text-[2.75rem] sm:leading-none md:text-[3.6rem] md:leading-[3.6rem] font-[Noto_Serif] italic text-[#406749] break-words">
            Detected
          </p>
        </div>
        <div className="bg-[#E7E8E7] py-2 px-4 sm:pl-4 sm:pr-2 box-border rounded-[15px] flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <p className="text-[11px] sm:text-[12px] text-[#414844] leading-tight whitespace-nowrap">
            HEALTH SCORE
          </p>
          <p className="text-[#BA1A1A] text-[1.35rem] sm:text-[1.5rem] font-[Noto_Serif] tabular-nums">
            45%
          </p>
        </div>
      </div>
      <div className="h-8 sm:h-10 md:h-12" aria-hidden />
      <div className="flex w-full h-auto flex-col lg:flex-row gap-8 lg:gap-10 lg:justify-between">
        <div className="relative w-full lg:w-2/5 shrink-0">
          <img
            src={sample2}
            alt=""
            className="w-full rounded-[12px] lg:rounded-none object-cover max-h-[min(55vh,420px)] lg:max-h-none"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-[0.65rem] sm:text-[0.7rem] border border-[#012D1D] py-1 px-2.5 sm:px-3 rounded-full z-[2] bg-[#FFFFFFE5] text-[#012D1D] text-center">
            AI Analysis...
          </div>
        </div>
        <div className="flex-1 bg-white rounded-[16px] md:rounded-[20px] box-border p-5 sm:p-8 md:p-10 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <p className="text-xl sm:text-[1.65rem] md:text-[2rem] italic font-[Noto_Serif] text-[#012D1D] break-words pr-2">
                {reports[pointer].heading}
              </p>
              <span className="shrink-0 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
                {reports[pointer].icon}
              </span>
            </div>
            <br className="hidden sm:block" />
            <p className="text-[#414844] text-left sm:text-justify text-[0.85rem] sm:text-base leading-relaxed sm:leading-5">
              {reports[pointer].paragraph}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {reports.map((report, index) => (
              <button
                key={index}
                onClick={() => handleclick(index)}
                className={clsx(
                  "buttonanimate text-[0.65rem] sm:text-[0.7rem] px-3 py-2 sm:px-5 rounded-lg max-w-full min-w-0",
                  pointer === index
                    ? "bg-[#012D1D] text-white"
                    : "bg-[#E7E8E7] text-[#012D1D]",
                )}
              >
                <span className="line-clamp-2 sm:line-clamp-none text-left">
                  {report.heading}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Report chat — in document flow; height follows visible viewport */}
      <div
        className="w-full flex-1 min-h-[min(60dvh,520px)] max-h-[85dvh] sm:min-h-[min(70dvh,640px)] sm:max-h-[80dvh] flex flex-col bg-white rounded-[16px] md:rounded-[20px] shadow-[0_12px_40px_rgba(1,45,29,0.1)] border border-[#E7E8E7] overflow-hidden"
        role="region"
        aria-label="Chat preview"
      >
        <div className="bg-[#012D1D] text-white px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/15 shrink-0">
              <Leaf size={18} className="text-[#A8C9A8]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-[Noto_Serif] text-[0.95rem] sm:text-[1rem] leading-tight truncate">
                PlantCare Assistant
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/75 truncate">
                Health Analysis Chat Bot
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 sm:gap-4 px-3 sm:px-6 md:px-8 py-4 sm:py-6 overflow-y-auto hide-scrollbar min-h-0 border-b border-[#E7E8E7]/80">
          <div className="flex justify-end">
            <div
              className="h-8 sm:h-9 w-[min(75%,280px)] rounded-2xl rounded-br-md bg-[#012D1D]/10"
              aria-hidden
            />
          </div>
          <div className="flex justify-start">
            <div
              className="h-14 sm:h-16 w-[min(88%,420px)] rounded-2xl rounded-bl-md bg-[#E7E8E7]/90"
              aria-hidden
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 md:px-8 flex gap-2 shrink-0 bg-white">
          <input
            type="text"
            placeholder="Message…"
            className="flex-1 min-w-0 rounded-xl border border-[#E7E8E7] bg-[#F9F9F8] px-3 py-2 sm:py-2.5 text-[12px] sm:text-[13px] text-[#414844]/50 cursor-pointer"
          />
          <button
            type="button"
            className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-[#012D1D] buttonanimate"
            aria-label="Send"
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Report;

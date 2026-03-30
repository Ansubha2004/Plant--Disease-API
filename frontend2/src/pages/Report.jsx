import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HeartPulse, ShieldPlus, TriangleAlert, Send, Leaf } from "lucide-react";
import clsx from "clsx";

function Report() {
  const location = useLocation();
  const { diagnosis, preview } = location.state || {};
  const [pointer, setPointer] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // If no diagnosis, show fallback
  if (!diagnosis) {
    return (
      <div className="p-10 text-center">
        <p>No diagnosis data. Please go back and upload an image.</p>
      </div>
    );
  }

  // Extract fields from backend response
  const {
    class_name: disease = "Unknown",
    health_label: healthScore = 0,
    disease_analysis = "No analysis available.",
    immediate_treatment = "No treatment steps provided.",
    preventive_measures = "No preventive measures provided.",
    session_id: sessionId,
  } = diagnosis;

  // Build sections dynamically
  const sections = [
    {
      heading: "Disease Analysis",
      paragraph: disease_analysis,
      icon: <TriangleAlert size={40} color="#012D1D" />,
    },
    {
      heading: "Immediate Treatment",
      paragraph: immediate_treatment,
      icon: <HeartPulse size={40} color="#012D1D" />,
    },
    {
      heading: "Preventive Measures",
      paragraph: preventive_measures,
      icon: <ShieldPlus size={40} color="#012D1D" />,
    },
  ];

  const handleclick = (i) => setPointer(i);

  // Chat functions
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: input }),
      });
      const data = await response.json();
      const botMsg = { sender: "bot", text: data.reply || "Sorry, I couldn't process that." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to assistant." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section id="report" className="px-[6%] pt-20 pb-20 box-border bg-[#F9F9F8] relative w-full max-w-full min-w-0 min-h-screen z-[2] h-auto overflow-x-hidden">
      <div className="flex w-full h-auto flex-col gap-6 sm:flex-row sm:justify-between sm:items-end">
        <div className="min-w-0">
          <p className="text-[0.8rem] text-[#414844] intrumentsans mb-2">DIAGNOSTIC REPORT</p>
          <p className="text-[2rem] leading-[1.05] sm:text-[2.75rem] sm:leading-none md:text-[3.6rem] md:leading-[3.6rem] text-[#012D1D] notoserif break-words">
            {disease}
          </p>
          <p className="text-[2rem] leading-[1.05] sm:text-[2.75rem] sm:leading-none md:text-[3.6rem] md:leading-[3.6rem] notoserif italic text-[#406749] break-words">
            Detected
          </p>
        </div>
        <div className="bg-[#E7E8E7] py-2 px-4 sm:pl-4 sm:pr-2 box-border rounded-[15px] flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <p className="text-[11px] sm:text-[12px] text-[#414844] manrope leading-tight whitespace-nowrap">HEALTH SCORE</p>
          <p className="text-[#BA1A1A] text-[1.35rem] sm:text-[1.5rem] notoserif tabular-nums">{healthScore}%</p>
        </div>
      </div>
      <div className="h-8 sm:h-10 md:h-12" aria-hidden />
      <div className="flex w-full h-auto flex-col lg:flex-row gap-8 lg:gap-10 lg:justify-between">
        <div className="relative w-full lg:w-2/5 shrink-0">
          <img
            src={preview || "https://via.placeholder.com/400"}
            alt="Uploaded leaf"
            className="w-full rounded-[12px] lg:rounded-none object-cover max-h-[min(55vh,420px)] lg:max-h-none"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-[0.65rem] sm:text-[0.7rem] border border-[#012D1D] py-1 px-2.5 sm:px-3 rounded-full z-[2] bg-[#FFFFFFE5] text-[#012D1D] text-center manrope">
            AI Analysis
          </div>
        </div>
        <div className="flex-1 bg-white rounded-[16px] md:rounded-[20px] box-border p-5 sm:p-8 md:p-10 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <p className="text-xl sm:text-[1.65rem] md:text-[2rem] italic notoserif text-[#012D1D] break-words pr-2">
                {sections[pointer].heading}
              </p>
              <span className="shrink-0 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
                {sections[pointer].icon}
              </span>
            </div>
            <br className="hidden sm:block" />
            <p className="text-[#414844] text-left sm:text-justify text-[0.85rem] sm:text-base leading-relaxed sm:leading-5 manrope whitespace-pre-line">
              {sections[pointer].paragraph}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => handleclick(index)}
                className={clsx(
                  "buttonanimate text-[0.65rem] sm:text-[0.7rem] px-3 py-2 sm:px-5 rounded-lg max-w-full min-w-0",
                  pointer === index ? "bg-[#012D1D] text-white" : "bg-[#E7E8E7] text-[#012D1D]"
                )}
              >
                <span className="line-clamp-2 sm:line-clamp-none text-left">{sections[index].heading}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <br /><br /><br />

      {/* Chat section – same as before, but with functional messaging */}
      <div className="w-full flex-1 min-h-[min(60dvh,520px)] max-h-[85dvh] sm:min-h-[min(70dvh,640px)] sm:max-h-[80dvh] flex flex-col bg-white rounded-[16px] md:rounded-[20px] shadow-[0_12px_40px_rgba(1,45,29,0.1)] border border-[#E7E8E7] overflow-hidden">
        <div className="bg-[#012D1D] text-white px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/15 shrink-0">
              <Leaf size={18} className="text-[#A8C9A8]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="notoserif text-[0.95rem] sm:text-[1rem] leading-tight truncate">PlantCare Assistant</p>
              <p className="text-[10px] sm:text-[11px] text-white/75 truncate">Health Analysis Chat Bot</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 px-3 sm:px-6 md:px-8 py-4 sm:py-6 overflow-y-auto hide-scrollbar min-h-0 border-b border-[#E7E8E7]/80">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm">Ask me about treatment, symptoms, or prevention.</div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user" ? "bg-[#012D1D] text-white rounded-br-md" : "bg-[#E7E8E7] text-[#1e293b] rounded-bl-md"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start">
              <div className="bg-[#E7E8E7] rounded-2xl rounded-bl-md px-4 py-2 text-sm">Typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 sm:p-4 md:px-8 flex gap-2 shrink-0 bg-white">
          <input
            type="text"
            placeholder="Ask about treatment, symptoms..."
            className="flex-1 min-w-0 rounded-xl border border-[#E7E8E7] bg-[#F9F9F8] px-3 py-2 sm:py-2.5 text-[12px] sm:text-[13px] text-[#414844] focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            disabled={chatLoading}
            className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-[#012D1D] buttonanimate disabled:opacity-50"
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
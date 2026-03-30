import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Homebg from "../components/Homebg.jsx";
import Hometext from "../components/Hometext.jsx";
import imageuploadlogo from "../assets/imageuploadlogo.png";
import camera from "../assets/camera.png";
import sample1 from "../assets/sample1.png";
import sample2 from "../assets/sample2.png";
import sample3 from "../assets/sample3.png";
import sample4 from "../assets/sample4.png";
import {success,failure} from "../utils/notify.js";

function Home({setUploaded,setresult}) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const samples = [sample1, sample2, sample3, sample4];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setUploaded(true)
      return;
    }
    setSelectedFile(null);
    setPreview(null);
    setUploaded(false)
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      failure("Please select an image first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // backend expects 'file'

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) 
        {
          setresult(false)
          throw new Error(data.error || "Prediction failed");}
      

      // Pass the whole response to the report page
      setresult(true)
      navigate("/report", { state: { diagnosis: data, preview } });
    } catch (error) {
      console.error("Error:", error);
      setresult(false)
      failure("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full z-[1] h-auto">
      <Homebg />
      <div className="relative w-screen h-auto z-[5]">
        <Hometext />
        <br />
        <br />
        <div className="px-30 w-full flex justify-center gap-6">
          <div className="w-2/3 py-[60px] border-dashed rounded-[32px] border-[#C1C8C24D] bg-white/70 border-[5px] flex flex-col justify-center items-center backdrop-blur-sm">
            <img src={imageuploadlogo} className="h-20" alt="upload" />
            <p className="text-[1.3rem] notoserif text-[#012D1D] my-2">
              Upload leaf imagery
            </p>
            <p className="text-center text-[0.9rem] manrope text-[#414844] leading-4">
              Drag and drop high-resolution photos or
              <br />
              browse your local files.
            </p>
            <br />
            <div className="flex justify-center items-center gap-3 mt-2">
              <div className="flex  gap-2 bg-[#E7E8E7] pr-3 pl-1 py-1 box-border rounded-lg items-center">
                <div className="flex  items-center">
                  <label className="bg-[#012D1D66] text-[#012D1D] py-1 px-3 rounded-lg buttonanimate cursor-pointer manrope text-[0.9rem] manrope">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                        setUploaded(false);
                      }}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-[0.9rem] manrope">
                  {selectedFile ? selectedFile.name : "No image selected"}
                </div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="flex gap-2 manrope items-center bg-[#012D1D] text-white text-[0.9rem] px-7 py-2 rounded-lg buttonanimate"
              >
                <img src={camera} className="h-[1rem]" alt="camera" />
                {loading ? "Analyzing..." : "Analyse Image"}
              </button>
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-32 rounded object-cover"
              />
            )}
            <p className="mt-3 uppercase text-[0.6rem] text-[#717973]">
              Supported: JPG, PNG, HEIC (Max 15MB)
            </p>
          </div>
          <div className="flex-1 flex flex-col box-border p-[30px] rounded-[32px] bg-[#F3F4F395] backdrop-blur-sm">
            <p className="notoserif text-[1.2rem] text-[#012D1D]">
              Test the system
            </p>
            <p className="text-[#414844] text-[0.8rem] leading-4">
              Don't have a photo ready? Use one of our carefully curated samples
              to see how the analysis works.
            </p>
            <br />
            <div className="flex w-full flex-wrap justify-center items-center gap-5">
              {samples.map((sample, index) => (
                <a
                  key={index}
                  className="w-[44%] hover:scale-[1.05] transition-all ease-in-out"
                  href={sample}
                  download
                >
                  <img src={sample} alt={`sample ${index + 1}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-white my-8 text-[1.2rem] text-shadow-[2px_2px_15px_rgba(0,0,0,0.25)] font-[500] manrope">
          Trained using 54,000+ data, to give you accurate disease for your
          plant.
        </p>
      </div>
    </section>
  );
}

export default Home;

import React from "react";
import Footer from "../components/Footer";

const DownloadPage = () => {
  return (
    <div>
        <div className=" min-h-screen flex items-center justify-center ">
      
      <div className="w-full max-w-5xl rounded-xl p-10 bg-gradient-to-br from-pink-400 via-purple-400 to-green-300">
        
        {/* Logo */}
        <div className="mb-6 text-black font-bold text-lg">
          Spotify
        </div>

        {/* Content */}
        <div className="text-black max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Download Spotify for Windows
          </h1>

          <p className="text-sm mb-6">
            Enjoy high-quality audio and offline playback, plus Windows Game Bar
            integration and a Friend Activity feed that lets you see what your
            friends are listening to in real time.
          </p>

          {/* Button */}
          <div className="mb-3">
            <button className="bg-black text-white px-5 py-2 rounded-md font-semibold">
              Download from the Microsoft Store
            </button>
          </div>

          <p className="text-xs underline cursor-pointer">
            Download directly from Spotify
          </p>
        </div>

        {/* Image */}
        <div className="mt-10 flex justify-center">
          <img
            src="https://open.spotifycdn.com/cdn/images/download-page-image.781553a2.png"
            alt="spotify download"
            className="w-full max-w-3xl"
          />
        </div>

      </div>


    </div>
    <Footer/>
    </div>
  );
};

export default DownloadPage;

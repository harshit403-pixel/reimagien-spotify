import React from "react";
import { RxCross2 } from "react-icons/rx";

const Friends = () => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      {/* Modal */}
      <div className="relative bg-[#2a2a2a] text-white w-[360px] p-6 rounded-lg shadow-xl text-center">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 leading-snug">
          Check what friends are playing with the Windows app
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6">
          Explore the tracks your friends are spinning and get inspired for your next play.
        </p>

        {/* Button */}
        <button className="bg-white text-black px-4 py-2 rounded-md font-semibold mb-3">
          Download from the Microsoft Store
        </button>

        {/* Link */}
        <p className="text-sm text-gray-300 hover:underline cursor-pointer">
          Download directly from Spotify
        </p>

      </div>
    </div>
  );
};

export default Friends;
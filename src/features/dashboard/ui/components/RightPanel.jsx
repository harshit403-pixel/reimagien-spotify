import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const RightPanel = () => {
  return (
    <div className="w-[320px] h-full bg-[#121212] text-white p-4 rounded-lg flex flex-col gap-4">
      
      {/* Header */}
      <h2 className="text-lg font-semibold">Bonita</h2>

      {/* Album Card */}
      <div className="bg-[#181818] p-3 rounded-lg">
        <img
          src="https://i1.sndcdn.com/artworks-nDyghzbWRnSZsiHy-P0uilg-t500x500.jpg"
          alt="album"
          className="w-full h-[220px] object-cover rounded-md mb-3"
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-base">Bonita</p>
            <p className="text-sm text-gray-400">
              Yo Yo Honey Singh, THE SHAMS
            </p>
          </div>

          <FiPlusCircle className="text-xl text-gray-300 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* About Artist */}
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <img
          src="https://i1.sndcdn.com/artworks-nDyghzbWRnSZsiHy-P0uilg-t500x500.jpg"
          alt="artist"
          className="w-full h-[140px] object-cover"
        />

        <div className="p-3">
          <p className="font-semibold text-sm mb-1">About the artist</p>
          <p className="text-xs text-gray-400">
            Yo Yo Honey Singh is an Indian music producer, singer, and rapper known for his energetic tracks.
          </p>
        </div>
      </div>

    </div>
  );
};

export default RightPanel;
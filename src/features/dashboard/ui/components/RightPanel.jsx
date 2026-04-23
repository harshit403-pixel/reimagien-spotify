import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const RightPanel = ({song}) => {
  return (
    <div className=" h-full bg-[#121212] text-white p-4 rounded-lg flex flex-col gap-4">
      
      {/* Header */}
      <h2 className="text-lg font-semibold">{song?.title}</h2>

      {/* Album Card */}
      <div className="bg-[#181818] p-3 rounded-lg">
        <img
          src={song?.thumbnail}
          alt="album"
          className="w-full h-[220px] object-cover rounded-md mb-3"
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-base">{song?.title}</p>
            <p className="text-sm text-gray-400">
              {song?.artist}
            </p>
          </div>

          <FiPlusCircle className="text-xl text-gray-300 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
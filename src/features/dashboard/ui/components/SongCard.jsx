import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";
import { playNewSong } from "../../../player/state/playerSlice.jsx.jsx";
import Footer from "./Footer.jsx";

const MusicCard = ({ data }) => {
    let {dispatch} = useDashboard()
  return (
    <div className="group w-[200px] bg-[#181818] p-4 rounded-lg hover:bg-[#232323] transition duration-300 cursor-pointer">
      
      {/* Image */}
      <div className="relative mb-4">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-[180px] object-cover rounded-md"
        />

        {/* Play Button (hidden → hover) */}
        <div className="absolute bottom-2 right-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
          <button
          onClick={()=> dispatch(playNewSong(data)) }
          className="bg-[#1ed760] p-4 cursor-pointer rounded-full shadow-lg hover:scale-105 transition">
            <FaPlay className="text-black text-sm" />
          </button>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-white font-semibold text-[16px] truncate">
        {data.title}
      </h3>

      <p className="text-gray-400 text-sm mt-1 truncate">
        {data.artist}
      </p>
      
    </div>
  );
};

export default MusicCard;
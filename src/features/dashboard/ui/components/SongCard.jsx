import React, { useEffect, useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDashboard } from "../../hooks/useDashboard";
import { playNewSong } from "../../../player/state/playerSlice.jsx";
import { getLoggedInUser } from "../../../auth/utils/authStorage.js";
import { isSongLiked, toggleLikedSong } from "../../utils/libraryStorage.js";

const MusicCard = ({ data, index, queue }) => {
  const { dispatch } = useDashboard();
  const loggedInUser = getLoggedInUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isSongLiked(loggedInUser?.email, data.url));
  }, [data.url, loggedInUser?.email]);

  const handleLikeToggle = (event) => {
    event.stopPropagation();
    const nextLikedState = toggleLikedSong(loggedInUser?.email, data.url);
    setLiked(nextLikedState);
  };

  return (
    <div className="group w-[200px] bg-[#181818] p-4 rounded-lg hover:bg-[#232323] transition duration-300 cursor-pointer">
      <div className="relative mb-4">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-[180px] object-cover rounded-md"
        />

        <button
          onClick={handleLikeToggle}
          className="absolute top-2 right-2 bg-black/60 p-2 rounded-full cursor-pointer"
        >
          {liked ? (
            <FaHeart className="text-[#1ed760]" />
          ) : (
            <FiHeart className="text-white" />
          )}
        </button>

        <div className="absolute bottom-2 right-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
          <button
            onClick={() => dispatch(playNewSong({ song: data, queue, index }))}
            className="bg-[#1ed760] p-4 cursor-pointer rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaPlay className="text-black text-sm" />
          </button>
        </div>
      </div>

      <h3 className="text-white font-semibold text-[16px] truncate">
        {data.title}
      </h3>

      <p className="text-gray-400 text-sm mt-1 truncate">{data.artist}</p>
    </div>
  );
};

export default MusicCard;

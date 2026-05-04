import React, { useEffect, useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDashboard } from "../../hooks/useDashboard";
import { playNewSong } from "../../../player/state/playerSlice.jsx";
import { getLoggedInUser } from "../../../auth/utils/authStorage.js";
import { isSongLiked, toggleLikedSong } from "../../utils/libraryStorage.js";
import { getSongId } from "../../utils/songUtils.js";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate.jsx";

const MusicCard = ({ data, index, queue }) => {
  const { dispatch } = useDashboard();
  const navigate = useAppNavigate();
  const loggedInUser = getLoggedInUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isSongLiked(loggedInUser?.email, data.url));
  }, [data.url, loggedInUser?.email]);

  const openSongDetails = () => {
    navigate(`/dashboard/songs/${getSongId(data)}`);
  };

  const handleLikeToggle = (event) => {
    event.stopPropagation();
    const nextLikedState = toggleLikedSong(loggedInUser?.email, data.url);
    setLiked(nextLikedState);
  };

  const handlePlaySong = (event) => {
    event.stopPropagation();
    dispatch(playNewSong({ song: data, queue, index }));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openSongDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSongDetails();
        }
      }}
      className="group w-[200px] rounded-lg bg-[#181818] p-4 text-left transition duration-300 hover:bg-[#232323] cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-[180px] object-cover rounded-md"
        />

        <button
          type="button"
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
            type="button"
            onClick={handlePlaySong}
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

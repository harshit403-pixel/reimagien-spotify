import React from "react";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate.jsx";
import { getSongId } from "../../../dashboard/utils/songUtils.js";

const SideSong = ({ song }) => {
  const navigate = useAppNavigate();

  const openSongDetails = () => {
    if (!song?.url) {
      return;
    }

    navigate(`/dashboard/songs/${getSongId(song)}`);
  };

  return (
    <div
      role="button"
      tabIndex={song?.url ? 0 : -1}
      onClick={openSongDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSongDetails();
        }
      }}
      className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5 cursor-pointer"
    >
      <div
        className="h-14 w-14 rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url('${song?.thumbnail}')` }}
      ></div>
      <div>
        <div>
          <p className="text-sm font-semibold">{song?.title}</p>
          <p className="text-xs text-gray-400">{song?.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default SideSong;

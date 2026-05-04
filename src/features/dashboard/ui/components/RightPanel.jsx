import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate.jsx";
import { getSongId } from "../../utils/songUtils.js";

const RightPanel = ({ song }) => {
  const navigate = useAppNavigate();

  const openSongDetails = () => {
    if (!song?.url) {
      return;
    }

    navigate(`/dashboard/songs/${getSongId(song)}`);
  };

  return (
    <div className=" h-full bg-[#121212] text-white p-4 rounded-lg flex flex-col gap-4">
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
        className="flex flex-col p-2 gap-4 rounded-xl transition hover:bg-white/5 cursor-pointer"
      >
        <h2 className="text-lg font-semibold">{song?.title}</h2>

        <div className="bg-[#181818] p-3 rounded-lg transition hover:bg-[#202020]">
          <img
            src={song?.thumbnail}
            alt="album"
            className="w-full h-[220px] object-cover rounded-md mb-3"
          />

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-base">{song?.title}</p>
                <p className="text-sm text-gray-400">{song?.artist}</p>
              </div>

              <FiPlusCircle className="text-xl text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;

import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate";
import { getLoggedInUser } from "../../../auth/utils/authStorage.js";
import {
  getLikedSongUrls,
  subscribeToLibraryUpdates,
} from "../../utils/libraryStorage.js";

const LeftPanel = () => {
  const navigate = useAppNavigate();
  const loggedInUser = getLoggedInUser();
  const [likedSongsCount, setLikedSongsCount] = useState(0);

  useEffect(() => {
    const syncLikedSongsCount = () => {
      setLikedSongsCount(getLikedSongUrls(loggedInUser?.email).length);
    };

    syncLikedSongsCount();

    return subscribeToLibraryUpdates(syncLikedSongsCount);
  }, [loggedInUser?.email]);

  const playlists = [
    {
      title: "Liked Songs",
      subtitle: `Playlist - ${likedSongsCount} song${likedSongsCount === 1 ? "" : "s"}`,
      img: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
      path: "/dashboard/liked-songs",
    },
  ];

  return (
    <div className=" h-full bg-[#121212] text-white p-4 rounded-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-300 font-semibold">
          <MdOutlineLibraryMusic size={22} />
          <span>Your Library</span>
        </div>

        <div className="flex items-center gap-3 text-gray-300">
          <FiPlus className="cursor-pointer hover:text-white" />
          <HiOutlineMenu className="cursor-pointer hover:text-white" />
        </div>
      </div>

      <div className="mb-4">
        <button className="bg-[#2a2a2a] px-4 py-1 rounded-full text-sm">
          Playlists
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 text-gray-400 text-sm">
        <FiSearch className="cursor-pointer hover:text-white" />
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <span>Recents</span>
          <HiOutlineMenu size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {playlists.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1f1f1f] cursor-pointer transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-12 h-12 rounded-md object-cover"
            />

            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;

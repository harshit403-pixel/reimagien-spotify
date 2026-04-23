import React from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { usePlayer, usePlayerDispatch } from "../../hooks/usePlayer";
import { playNewSong, pause, play } from "../../../player/state/playerSlice.jsx";
import { useSelector } from "react-redux";
import { store } from "../../../../app/store/store.jsx";
import SideSong from "../pages/SideSong.jsx";
import RightPanel from "../../../dashboard/ui/components/RightPanel.jsx";

const Player = () => {
     let { currentPlayingSong, isPlaying, queue} = useSelector((store)=> store.player)
     let smallSongArr = []
     smallSongArr.push(currentPlayingSong)
  
    let {dispatch} = usePlayerDispatch()
    let data = usePlayer()
    
    console.log(queue)

   let nextSong = ()=>{
     dispatch(playNewSong(queue[1]))
   }








  return (
    <div className="w-full bg-black border-t border-[#282828] px-4 py-3 flex items-center justify-between text-white">
      
      {/* LEFT (dummy placeholder) */}

      <div className="flex items-center gap-3 w-[25%]">
        
    {
  smallSongArr?.filter((elem) => elem && elem.url).length > 0 ? (
    smallSongArr
      .filter((elem) => elem && elem.url)
      .map((elem) => (
        <SideSong key={elem.url} song={elem} />
      ))
  ) : (
    <h1>Play the Song</h1>
  )
}
          
      </div>


      {/* CENTER CONTROLS */}
      <div className="flex flex-col items-center w-[50%]">
        
        {/* Controls */}
        <div className="flex items-center gap-5 mb-2 text-gray-300">
          <FaRandom className="hover:text-white cursor-pointer" />
          <FaStepBackward className="hover:text-white cursor-pointer" />
          
          {
            isPlaying? <button
          onClick={()=> dispatch(pause())}
          className="cursor-pointer bg-white text-black p-2 rounded-full hover:scale-105 transition">
            <FaPause size={14} />
          </button>: <button
          onClick={()=> dispatch(play())}
          className="cursor-pointer bg-white text-black p-2 rounded-full hover:scale-105 transition">
            <FaPlay size={14} />
          </button>
          }

          <FaStepForward
          onClick={()=>nextSong()}
          className="hover:text-white cursor-pointer" />
          <FaRedo className="hover:text-white cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">0:09</span>

          <div className="w-full h-1 bg-gray-700 rounded-full relative group cursor-pointer">
            <div className="w-[20%] h-full bg-white rounded-full"></div>

            {/* Hover circle */}
            <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
          </div>

          <span className="text-xs text-gray-400">7:01</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-4 w-[25%] text-gray-300">
        <MdOutlinePlaylistPlay className="hover:text-white cursor-pointer text-xl" />
        <FiVolume2 className="hover:text-white cursor-pointer" />

        {/* Volume Bar */}
        <div className="w-24 h-1 bg-gray-700 rounded-full relative group cursor-pointer">
          <div className="w-[60%] h-full bg-white rounded-full"></div>

          <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
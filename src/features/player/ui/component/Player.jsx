import React, { useRef } from "react";
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
import {
  pause,
  play,
  playNextSong,
  playPreviousSong,
  setVolume,
} from "../../state/playerSlice.jsx";
import SideSong from "../pages/SideSong.jsx";
import { BiMicrophone } from "react-icons/bi";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate.jsx";

const Player = () => {
  const navigate = useAppNavigate();
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const { dispatch } = usePlayerDispatch();
  const {
    currentPlayingSong,
    currentTime,
    duration,
    isPlaying,
    progress,
    queue,
    seekTo,
    volume,
  } = usePlayer();
  const smallSongArr = currentPlayingSong ? [currentPlayingSong] : [];

  const formatTime = (timeInSeconds) => {
    if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
      return "0:00";
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNextSong = () => {
    if (!queue.length) {
      return;
    }

    dispatch(playNextSong());
  };

  const handlePreviousSong = () => {
    if (!queue.length) {
      return;
    }

    if (currentTime > 5) {
      seekTo(0);
      return;
    }

    dispatch(playPreviousSong());
  };

  const handleSeekBarClick = (event) => {
    if (!duration || !progressBarRef.current) {
      return;
    }

    const progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const clickOffset = event.clientX - progressBarBounds.left;
    const clickRatio = Math.min(
      Math.max(clickOffset / progressBarBounds.width, 0),
      1,
    );

    seekTo(duration * clickRatio);
  };

  const updateVolume = (nextVolume) => {
    dispatch(setVolume(nextVolume));
  };

  const handleVolumeBarClick = (event) => {
    if (!volumeBarRef.current) {
      return;
    }

    const volumeBarBounds = volumeBarRef.current.getBoundingClientRect();
    const clickOffset = event.clientX - volumeBarBounds.left;
    const clickRatio = Math.min(
      Math.max(clickOffset / volumeBarBounds.width, 0),
      1,
    );

    updateVolume(clickRatio);
  };

  const handleVolumeToggle = () => {
    updateVolume(volume > 0 ? 0 : 0.6);
  };

  const progressWidth = `${Math.min(progress, 100)}%`;
  const volumeWidth = `${Math.min(volume * 100, 100)}%`;

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
          <FaStepBackward
            onClick={handlePreviousSong}
            className="hover:text-white cursor-pointer"
          />
          
          {
            isPlaying ? (
              <button
                onClick={() => dispatch(pause())}
                className="cursor-pointer bg-white text-black p-2 rounded-full hover:scale-105 transition"
              >
                <FaPause size={14} />
              </button>
            ) : (
              <button
                onClick={() => dispatch(play())}
                className="cursor-pointer bg-white text-black p-2 rounded-full hover:scale-105 transition"
              >
                <FaPlay size={14} />
              </button>
            )
          }

          <FaStepForward
            onClick={handleNextSong}
            className="hover:text-white cursor-pointer"
          />
          <FaRedo className="hover:text-white cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>

          <div
            ref={progressBarRef}
            onClick={handleSeekBarClick}
            className="w-full h-1 bg-gray-700 rounded-full relative group cursor-pointer"
          >
            <div
              style={{ width: progressWidth }}
              className="h-full bg-white rounded-full"
            ></div>

            {/* Hover circle */}
            <div
              style={{ left: progressWidth }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"
            ></div>
          </div>

          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-4 w-[25%] text-gray-300">
        <BiMicrophone
        onClick={()=> navigate("/dashboard/lyrics")}
        className="font-bold cursor-pointer "  ></BiMicrophone>
        <MdOutlinePlaylistPlay className="hover:text-white cursor-pointer text-xl" />
        <FiVolume2
          onClick={handleVolumeToggle}
          className="hover:text-white cursor-pointer"
        />

        {/* Volume Bar */}
        <div
          ref={volumeBarRef}
          onClick={handleVolumeBarClick}
          className="w-24 h-1 bg-gray-700 rounded-full relative group cursor-pointer"
        >
          <div
            style={{ width: volumeWidth }}
            className="h-full bg-white rounded-full"
          ></div>

          <div
            style={{ left: volumeWidth }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Player;

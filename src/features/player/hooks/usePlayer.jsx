import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pause,
  playNextSong,
  setDuration,
  setPlaybackTime,
} from "../state/playerSlice.jsx";

export const usePlayer = () => {
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  const {
    currentPlayingSong,
    isPlaying,
    currentIndex,
    queue,
    currentTime,
    duration,
    playbackToken,
    volume,
  } = useSelector((store) => store.player);

  useEffect(() => {
    const audio = audioRef.current;

    audio.preload = "metadata";

    const handleTimeUpdate = () => {
      dispatch(setPlaybackTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      if (queue.length > 1) {
        dispatch(playNextSong());
        return;
      }

      audio.currentTime = 0;
      dispatch(setPlaybackTime(0));
      dispatch(pause());
    };

    const handleError = () => {
      dispatch(pause());
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [dispatch, queue.length]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!currentPlayingSong?.url || playbackToken === 0) {
      return;
    }

    const audio = audioRef.current;
    audio.src = currentPlayingSong.url;
    audio.load();
    dispatch(setPlaybackTime(0));
    dispatch(setDuration(0));
  }, [currentPlayingSong, dispatch, playbackToken]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!currentPlayingSong?.url) {
      audio.pause();
      return;
    }

    if (!isPlaying) {
      audio.pause();
      return;
    }

    const playPromise = audio.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        dispatch(pause());
      });
    }
  }, [currentPlayingSong, dispatch, isPlaying]);

  const seekTo = (nextTime) => {
    const audio = audioRef.current;
    const maxDuration = audio.duration || duration;

    if (!Number.isFinite(nextTime) || !Number.isFinite(maxDuration)) {
      return;
    }

    const clampedTime = Math.min(Math.max(nextTime, 0), maxDuration);
    audio.currentTime = clampedTime;
    dispatch(setPlaybackTime(clampedTime));
  };

  return {
    currentPlayingSong,
    currentIndex,
    isPlaying,
    queue,
    currentTime,
    duration,
    volume,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    seekTo,
  };
};

export const usePlayerDispatch = () => {
  const dispatch = useDispatch();
  return { dispatch };
};

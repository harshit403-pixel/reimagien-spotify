import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  currentPlayingSong: null,
  currentIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackToken: 0,
  volume: 0.6,
};

const getSafeNumber = (value) => (Number.isFinite(value) ? value : 0);
const getSafeVolume = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), 1);
};

const resolveSelectedSong = (payload) => payload?.song ?? payload ?? null;

const resolveQueue = (payload, fallbackQueue) => {
  if (Array.isArray(payload?.queue) && payload.queue.length > 0) {
    return payload.queue;
  }

  if (Array.isArray(fallbackQueue) && fallbackQueue.length > 0) {
    return fallbackQueue;
  }

  if (payload?.song) {
    return [payload.song];
  }

  if (payload?.url) {
    return [payload];
  }

  return [];
};

const resolveIndex = (song, queue, explicitIndex) => {
  if (Number.isInteger(explicitIndex) && explicitIndex >= 0) {
    return explicitIndex;
  }

  if (!song) {
    return -1;
  }

  return queue.findIndex((queueSong) => queueSong.url === song.url);
};

const setCurrentSong = (state, nextIndex) => {
  if (!state.queue.length || nextIndex < 0 || !state.queue[nextIndex]) {
    return;
  }

  state.currentIndex = nextIndex;
  state.currentPlayingSong = state.queue[nextIndex];
  state.isPlaying = true;
  state.currentTime = 0;
  state.duration = 0;
  state.playbackToken += 1;
};

const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    playNewSong: (state, action) => {
      const selectedSong = resolveSelectedSong(action.payload);
      const nextQueue = resolveQueue(action.payload, state.queue);
      const nextIndex = resolveIndex(
        selectedSong,
        nextQueue,
        action.payload?.index,
      );

      if (!selectedSong || nextIndex === -1) {
        return;
      }

      state.queue = nextQueue;
      setCurrentSong(state, nextIndex);
    },
    playNextSong: (state) => {
      if (!state.queue.length) {
        return;
      }

      const nextIndex =
        state.currentIndex >= state.queue.length - 1 ? 0 : state.currentIndex + 1;

      setCurrentSong(state, nextIndex);
    },
    playPreviousSong: (state) => {
      if (!state.queue.length) {
        return;
      }

      const previousIndex =
        state.currentIndex <= 0 ? state.queue.length - 1 : state.currentIndex - 1;

      setCurrentSong(state, previousIndex);
    },
    play: (state) => {
      if (!state.currentPlayingSong && state.queue.length > 0) {
        const fallbackIndex = state.currentIndex >= 0 ? state.currentIndex : 0;
        setCurrentSong(state, fallbackIndex);
        return;
      }

      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setPlaybackTime: (state, action) => {
      state.currentTime = getSafeNumber(action.payload);
    },
    setDuration: (state, action) => {
      state.duration = getSafeNumber(action.payload);
    },
    setVolume: (state, action) => {
      state.volume = getSafeVolume(action.payload);
    },
    resetPlayer: () => ({
      ...initialState,
    }),
  },
});

export default playerSlice.reducer;
export const {
  pause,
  play,
  playNewSong,
  playNextSong,
  playPreviousSong,
  resetPlayer,
  setPlaybackTime,
  setDuration,
  setVolume,
} = playerSlice.actions;

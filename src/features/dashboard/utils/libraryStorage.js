const LIKED_SONGS_KEY = "spotify-liked-songs";
export const LIBRARY_UPDATED_EVENT = "spotify-library-updated";

const isBrowser = typeof window !== "undefined";

const readLikedSongsMap = () => {
  if (!isBrowser) {
    return {};
  }

  const rawValue = window.localStorage.getItem(LIKED_SONGS_KEY);

  if (!rawValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
};

const writeLikedSongsMap = (value) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(LIBRARY_UPDATED_EVENT));
};

export const getLikedSongUrls = (userEmail) => {
  if (!userEmail) {
    return [];
  }

  const likedSongsMap = readLikedSongsMap();
  const likedSongUrls = likedSongsMap[userEmail];

  return Array.isArray(likedSongUrls) ? likedSongUrls : [];
};

export const getLikedSongs = (userEmail, songs) => {
  const likedSongUrls = new Set(getLikedSongUrls(userEmail));
  return songs.filter((song) => likedSongUrls.has(song.url));
};

export const isSongLiked = (userEmail, songUrl) =>
  getLikedSongUrls(userEmail).includes(songUrl);

export const toggleLikedSong = (userEmail, songUrl) => {
  if (!userEmail || !songUrl) {
    return false;
  }

  const likedSongsMap = readLikedSongsMap();
  const currentLikedSongUrls = getLikedSongUrls(userEmail);
  const alreadyLiked = currentLikedSongUrls.includes(songUrl);
  const nextLikedSongUrls = alreadyLiked
    ? currentLikedSongUrls.filter((likedSongUrl) => likedSongUrl !== songUrl)
    : [...currentLikedSongUrls, songUrl];

  likedSongsMap[userEmail] = nextLikedSongUrls;
  writeLikedSongsMap(likedSongsMap);

  return !alreadyLiked;
};

export const subscribeToLibraryUpdates = (callback) => {
  if (!isBrowser) {
    return () => {};
  }

  const handleLibraryUpdate = () => {
    callback();
  };

  window.addEventListener(LIBRARY_UPDATED_EVENT, handleLibraryUpdate);
  window.addEventListener("storage", handleLibraryUpdate);

  return () => {
    window.removeEventListener(LIBRARY_UPDATED_EVENT, handleLibraryUpdate);
    window.removeEventListener("storage", handleLibraryUpdate);
  };
};

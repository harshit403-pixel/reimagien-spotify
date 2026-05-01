import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { allSongs } from "../../api/songsApi";
import Footer from "../components/Footer";
import MusicCard from "../components/SongCard";
import { getLoggedInUser } from "../../../auth/utils/authStorage.js";
import {
  getLikedSongs,
  subscribeToLibraryUpdates,
} from "../../utils/libraryStorage.js";
import { filterSongsBySearch, sortSongsByArtist } from "../../utils/songUtils.js";

const LikedSongsPage = () => {
  const [searchParams] = useSearchParams();
  const loggedInUser = getLoggedInUser();
  const searchValue = searchParams.get("search") ?? "";
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const syncLikedSongs = () => {
      const nextLikedSongs = getLikedSongs(loggedInUser?.email, allSongs());
      setLikedSongs(
        sortSongsByArtist(filterSongsBySearch(nextLikedSongs, searchValue)),
      );
    };

    syncLikedSongs();

    return subscribeToLibraryUpdates(syncLikedSongs);
  }, [loggedInUser?.email, searchValue]);

  return (
    <div className="text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Liked Songs</h1>
        <p className="text-gray-400 text-sm">
          Your saved songs are available here for the logged-in account.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <MusicCard
              data={song}
              index={index}
              key={song.url}
              queue={likedSongs}
            />
          ))
        ) : (
          <div className="text-center w-full py-16">
            <h2 className="text-2xl font-bold mb-2">No liked songs yet</h2>
            <p className="text-gray-400">
              Tap the like button on a song card and it will appear here.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LikedSongsPage;

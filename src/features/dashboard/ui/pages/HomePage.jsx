import React from "react";
import { useSearchParams } from "react-router";
import { allSongs } from "../../api/songsApi";
import MusicCard from "../components/SongCard";
import Footer from "../components/Footer";
import { filterSongsBySearch, sortSongsByArtist } from "../../utils/songUtils.js";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") ?? "";
  const songs = sortSongsByArtist(filterSongsBySearch(allSongs(), searchValue));

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4  ">
        {songs.length > 0 ? (
          songs.map((elem, index) => (
            <MusicCard data={elem} index={index} key={elem.url} queue={songs} />
          ))
        ) : (
          <div className="text-white text-center w-full py-16">
            <h2 className="text-2xl font-bold mb-2">No songs found</h2>
            <p className="text-gray-400">Try a different search in the top bar.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

import React from "react";
import { useParams } from "react-router";
import { FiArrowLeft, FiClock, FiGlobe, FiMusic, FiPlay } from "react-icons/fi";
import { BiMicrophone } from "react-icons/bi";
import { allSongs, songLyrics } from "../../api/songsApi";
import MusicCard from "../components/SongCard";
import { useDashboard } from "../../hooks/useDashboard";
import { playNewSong } from "../../../player/state/playerSlice.jsx";
import { useAppNavigate } from "../../../../shared/hooks/useNavigate.jsx";
import {
  findSongById,
  getRelatedSongsByAlbum,
  normalizeText,
} from "../../utils/songUtils.js";

const detailedSongData = songLyrics();

const isDetailedSongMatch = (song) => {
  if (!song) {
    return false;
  }

  return (
    song.url === detailedSongData.url ||
    normalizeText(song.title) === normalizeText(detailedSongData.title)
  );
};

const SongDetailsPage = () => {
  const { songId } = useParams();
  const navigate = useAppNavigate();
  const { dispatch } = useDashboard();
  const songs = allSongs();
  const selectedSong = findSongById(songs, songId);
  const detailedSong = isDetailedSongMatch(selectedSong)
    ? { ...selectedSong, ...detailedSongData }
    : selectedSong;
  const relatedSongs = getRelatedSongsByAlbum(songs, selectedSong);

  if (!selectedSong) {
    return (
      <div className="flex h-full items-center justify-center text-white">
        <div className="max-w-lg rounded-[28px] border border-white/10 bg-[#181818] p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            Song not found
          </p>
          <h1 className="mt-4 text-3xl font-bold font-spotify">
            We couldn&apos;t find that song.
          </h1>
          <p className="mt-3 text-white/70">
            The route is dynamic, so if the song data changes this page may no
            longer match a track in the JSON.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] cursor-pointer"
          >
            <FiArrowLeft />
            Back to library
          </button>
        </div>
      </div>
    );
  }

  const songMeta = [
    { label: "Album", value: detailedSong.album?.trim() },
    { label: "Year", value: detailedSong.year?.trim() },
    { label: "Duration", value: detailedSong.duration },
    { label: "Genre", value: detailedSong.genre },
    { label: "Language", value: detailedSong.language },
  ].filter((item) => item.value);

  const songStats = detailedSong.stats
    ? [
        { label: "Plays", value: detailedSong.stats.plays?.toLocaleString() },
        { label: "Likes", value: detailedSong.stats.likes?.toLocaleString() },
        {
          label: "Downloads",
          value: detailedSong.stats.downloads?.toLocaleString(),
        },
      ].filter((item) => item.value)
    : [];

  const songDescription =
    detailedSong.description?.trim() ||
    `${detailedSong.title?.trim()} is part of ${detailedSong.album?.trim()} by ${detailedSong.artist?.trim()}.`;

  return (
    <div className="h-full overflow-y-auto pr-1 text-white">
      <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(30,215,96,0.28)_0%,rgba(24,24,24,0.98)_42%,rgba(18,18,18,1)_100%)] p-6 md:p-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 cursor-pointer"
        >
          <FiArrowLeft />
          Back to songs
        </button>

        <div className="mt-6 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/25 p-4">
            <img
              src={detailedSong.thumbnail}
              alt={detailedSong.title}
              className="h-[320px] w-full rounded-[22px] object-cover shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">
              Song details
            </p>
            <h1 className="mt-3 text-4xl font-bold font-spotify md:text-6xl">
              {detailedSong.title?.trim()}
            </h1>
            <p className="mt-4 text-lg text-white/70 md:text-xl">
              {detailedSong.artist?.trim()}
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/70">
              {songDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {songMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  <span className="text-white/45">{item.label}:</span>{" "}
                  {item.value}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => dispatch(playNewSong({ song: selectedSong, queue: songs }))}
                className="inline-flex items-center gap-2 rounded-full bg-[#1ed760] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] cursor-pointer"
              >
                <FiPlay />
                Play song
              </button>

              {isDetailedSongMatch(selectedSong) ? (
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/lyrics")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/40 cursor-pointer"
                >
                  <BiMicrophone />
                  View synced lyrics
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {songStats.length > 0 ? (
            songStats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-black/20 p-5"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-bold">{item.value}</p>
              </div>
            ))
          ) : (
            <>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  Album
                </p>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold">
                  <FiMusic className="text-[#1ed760]" />
                  {detailedSong.album?.trim() || "Single"}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  Duration
                </p>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold">
                  <FiClock className="text-[#1ed760]" />
                  {detailedSong.duration || "Available in player"}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  Language
                </p>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold">
                  <FiGlobe className="text-[#1ed760]" />
                  {detailedSong.language || "Not specified"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-white/45">
            Related songs
          </p>
          <h2 className="mt-2 text-3xl font-bold font-spotify">
            More from the same album
          </h2>
        </div>

        {relatedSongs.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {relatedSongs.map((song, index) => (
              <MusicCard
                key={song.url}
                data={song}
                index={index}
                queue={relatedSongs}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-[#181818] p-6 text-white/70">
            No related songs were found for this album yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDetailsPage;

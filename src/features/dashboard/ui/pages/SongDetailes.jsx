import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BiMicrophone } from "react-icons/bi";
import { songLyrics } from "../../api/songsApi";

const mappedSong = songLyrics();

const normalizeSongValue = (value) => (value ?? "").trim().toLowerCase();

const getLyricsForSong = (song) => {
  if (!song) {
    return null;
  }

  const isMatchingUrl = song.url && song.url === mappedSong.url;
  const isMatchingTitle =
    normalizeSongValue(song.title) === normalizeSongValue(mappedSong.title);

  return isMatchingUrl || isMatchingTitle ? mappedSong : null;
};

const getActiveLyricIndex = (lyrics, currentTime) => {
  if (!Array.isArray(lyrics) || lyrics.length === 0) {
    return -1;
  }

  if (currentTime <= lyrics[0].time) {
    return 0;
  }

  for (let index = 0; index < lyrics.length; index += 1) {
    const currentLyric = lyrics[index];
    const nextLyric = lyrics[index + 1];

    if (currentTime >= currentLyric.time && (!nextLyric || currentTime < nextLyric.time)) {
      return index;
    }
  }

  return lyrics.length - 1;
};

const SongDetailes = () => {
  const activeLyricRef = useRef(null);
  const { currentPlayingSong, currentTime, isPlaying } = useSelector(
    (store) => store.player,
  );

  const syncedSong = getLyricsForSong(currentPlayingSong);
  const lyrics = syncedSong?.lyrics ?? [];
  const activeLyricIndex = getActiveLyricIndex(lyrics, currentTime);

  useEffect(() => {
    if (!activeLyricRef.current) {
      return;
    }

    activeLyricRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeLyricIndex]);

  if (!currentPlayingSong) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.24),_rgba(9,9,11,0.96)_50%)] p-8 text-white">
        <div className="max-w-xl text-center">
          <BiMicrophone className="mx-auto mb-4 text-6xl text-white/85" />
          <h1 className="text-4xl font-bold font-spotify">Synced lyrics</h1>
          <p className="mt-4 text-lg text-white/75">
            Start playing a song to open the live lyrics view. Right now synced
            lyrics are available for {mappedSong.title}.
          </p>
        </div>
      </div>
    );
  }

  if (!syncedSong) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_rgba(9,9,11,0.96)_55%)] p-8 text-white">
        <div className="max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
          <BiMicrophone className="mx-auto mb-4 text-6xl text-white/85" />
          <p className="text-sm uppercase tracking-[0.35em] text-white/45">
            Lyrics unavailable
          </p>
          <h1 className="mt-4 text-4xl font-bold font-spotify">
            {currentPlayingSong.title}
          </h1>
          <p className="mt-3 text-lg text-white/70">
            Synced lyrics are currently mapped for {mappedSong.title} only.
            Play that track to see the Spotify-style highlighted lyrics view.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(30,215,96,0.26),_rgba(18,18,18,0.98)_52%)] p-5 text-white md:p-6">
      <div className="flex h-full flex-col gap-5 xl:flex-row">
        <div className="xl:w-[32%]">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur">
            <img
              src={syncedSong.thumbnail}
              alt={syncedSong.title}
              className="h-72 w-full rounded-[24px] object-cover shadow-2xl"
            />

            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Now playing
              </p>
              <h1 className="mt-1  text-4xl font-bold font-spotify">
                {syncedSong.title}
              </h1>
              <p className="mt-2 text-base text-white/70">{syncedSong.artist}</p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 rounded-[28px] border border-white/10 bg-black/20 backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/45">
                Synced lyrics
              </p>
              <p className="mt-2 text-sm text-white/60">
                The highlighted line follows the live playback time.
              </p>
            </div>

            <div className="rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-white/80">
              {Math.floor(currentTime)}s
            </div>
          </div>

          <div className="h-[calc(100%-92px)] overflow-y-auto px-6 py-8 md:px-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-4 pb-24 pt-12">
              {lyrics.map((lyric, index) => {
                const distanceFromActive = Math.abs(activeLyricIndex - index);
                const isActiveLyric = index === activeLyricIndex;
                const isPastLyric = index < activeLyricIndex;

                let lyricClassName =
                  "text-white/30 text-2xl md:text-3xl scale-[0.98]";

                if (distanceFromActive === 1) {
                  lyricClassName = "text-white/60 text-3xl md:text-4xl";
                }

                if (isPastLyric && distanceFromActive > 1) {
                  lyricClassName = "text-white/45 text-2xl md:text-3xl";
                }

                if (isActiveLyric) {
                  lyricClassName =
                    "rounded-[22px] bg-white/12 px-5 py-4 text-white text-4xl md:text-5xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)]";
                }

                return (
                  <p
                    key={`${lyric.time}-${lyric.text}`}
                    ref={isActiveLyric ? activeLyricRef : null}
                    className={`font-spotify font-bold leading-tight tracking-tight transition-all duration-300 ${lyricClassName}`}
                  >
                    {lyric.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailes;

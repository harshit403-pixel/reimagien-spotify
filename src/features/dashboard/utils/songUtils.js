export const normalizeText = (value) =>
  (value || "").replace(/\s+/g, " ").toLowerCase().trim();

const slugifyText = (value) =>
  normalizeText(value)
    .replace(/&quot;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getPrimaryArtist = (artistName) =>
  (artistName || "")
    .split(/,|&|\/|\band\b/gi)[0]
    .trim();

const getSongUrlToken = (song) => {
  const lastUrlSegment = (song?.url || "").split("/").pop() || "";
  const urlWithoutExtension = lastUrlSegment.replace(/\.[^/.]+$/, "");
  const urlParts = urlWithoutExtension.split("_");
  const tokenSource = urlParts[urlParts.length - 1] || urlWithoutExtension;

  return slugifyText(tokenSource);
};

export const getSongId = (song) =>
  [
    slugifyText(song?.title),
    slugifyText(getPrimaryArtist(song?.artist)),
    getSongUrlToken(song),
  ]
    .filter(Boolean)
    .join("-");

export const findSongById = (songs, songId) =>
  songs.find((song) => getSongId(song) === songId) ?? null;

export const getRelatedSongsByAlbum = (songs, currentSong) => {
  const currentAlbum = normalizeText(currentSong?.album);

  if (!currentAlbum) {
    return [];
  }

  return songs.filter(
    (song) =>
      song.url !== currentSong.url &&
      normalizeText(song.album) === currentAlbum,
  );
};

export const sortSongsByArtist = (songs) =>
  [...songs].sort((firstSong, secondSong) => {
    const artistSortResult = getPrimaryArtist(firstSong.artist).localeCompare(
      getPrimaryArtist(secondSong.artist),
    );

    if (artistSortResult !== 0) {
      return artistSortResult;
    }

    return (firstSong.title || "").localeCompare(secondSong.title || "");
  });

export const filterSongsBySearch = (songs, searchTerm) => {
  const normalizedSearchTerm = normalizeText(searchTerm);

  if (!normalizedSearchTerm) {
    return songs;
  }

  return songs.filter((song) => {
    const searchableValues = [song.title, song.artist, song.album];

    return searchableValues.some((value) =>
      normalizeText(value).includes(normalizedSearchTerm),
    );
  });
};

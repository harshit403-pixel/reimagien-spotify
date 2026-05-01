const normalizeText = (value) => (value || "").toLowerCase().trim();

export const getPrimaryArtist = (artistName) =>
  (artistName || "")
    .split(/,|&|\/|\band\b/gi)[0]
    .trim();

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

const NOTES = {
  'C': 0,
  'C#' : 1, 'Db' : 1,
  'D' : 2,
  'D#' : 3, 'Eb' : 3,
  'E' : 4,
  'F' : 5,
  'F#' : 6, 'Gb' : 6,
  'G' : 7,
  'G#' : 8, 'Ab' : 8,
  'A' : 9,
  'A#' : 10, 'Bb' : 10,
  'B' : 11
};

const QUALITIES = {
  '' : [4, 7],
  'm' : [3, 7],
  'aug' : [4, 8],
  'dim' : [3, 6],
  '7' : [4, 7, 10],
  'maj7' : [4, 7, 11],
  'm7' : [3, 7, 10],
  'mM7' : [3, 7, 11],
  'm7b5' : [3, 6, 10],
  'aug7' : [4, 8, 10],
  'dim7' : [3, 6, 9]
};

export const noteNames = Object.keys(NOTES);
export const qualityNames = Object.keys(QUALITIES);

export const getChordNotes = (rootName, qualityName) => {
  chordNotes = [NOTES[rootName]];
  for (let increment of QUALITIES[qualityName]) {
    chordNotes.push((NOTES[rootName] + increment) % 12);
  }
  return chordNotes;
};

const NUM_NOTES = 12;
const NOTES = {
  '' : -1,
  'C' : 0,
  'Db' : 1,
  'D' : 2,
  'Eb' : 3,
  'E' : 4,
  'F' : 5,
  'Gb' : 6,
  'G' : 7,
  'Ab' : 8,
  'A' : 9,
  'Bb' : 10,
  'B' : 11
};

const QUALITIES = {
  '' : [],
  'maj' : [4, 7],
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

// use an array to enforce order
export const noteNames = ['', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
export const qualityNames = ['', 'maj', 'm', 'aug', 'dim', '7', 'maj7', 'm7', 'mM7', 'm7b5', 'aug7', 'dim7'];

export const getChordNotes = (rootName, qualityName) => {
  if (rootName === '' || qualityName === '') {
    return [];
  }

  chordNotes = [NOTES[rootName]];
  for (let increment of QUALITIES[qualityName]) {
    chordNotes.push((NOTES[rootName] + increment) % NUM_NOTES);
  }
  return chordNotes;
};

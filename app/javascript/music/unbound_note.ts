// Represents a note on the piano. The note is unbound because it's not set at any particular frequency or in
// any particular octave. It's just floating, so an Unbound C note corresponds to all the C keys on a piano
// or all the frets on any string of a guitar that would play a C note. This is useful for representing chords
// and scales and whatnot in the abstract before grounding them somewhere exactly on a staff.
import { INote } from './i_note';
import { Interval } from './interval';

const NotesToSemitones = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11
};

const SemitonesToFlatNotes = Object.keys(NotesToSemitones).reduce(function(agg, note) {
  if(!note.includes('#')) { agg[NotesToSemitones[note]] = note; }
  return agg;
}, {});


const SemitonesToSharpNotes = Object.keys(NotesToSemitones).reduce(function(agg, note) {
  if(!note.includes('b')) { agg[NotesToSemitones[note]] = note; }
  return agg;
}, {});

export class UnboundNote implements INote {
  symbol: string;
  semitonesAboveC: number;

  static fromString(string: string) {
    return new UnboundNote(string);
  }

  constructor(normalizedSymbol) {
    this.symbol = normalizedSymbol;
    this.semitonesAboveC = NotesToSemitones[normalizedSymbol];
  }

  bound() { return true; }
  unbind() { return this; }

  applyInterval(interval: Interval) {

  }

  // def apply_interval(interval)
  //   positive_semitones = (semitones_above_c + interval.semitones) % 12 # use modulo operator to get positive result for lookup table
  //   new_symbol = if symbol.include? 'b'
  //     SEMITONES_TO_FLAT_NOTES[positive_semitones]
  //   else
  //     SEMITONES_TO_SHARP_NOTES[positive_semitones]
  //   end
  //
  //   self.class.new(new_symbol)
  // end
}

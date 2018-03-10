// Represents a note on the piano. The note is unbound because it's not set at any particular frequency or in
// any particular octave. It's just floating, so an Unbound C note corresponds to all the C keys on a piano
// or all the frets on any string of a guitar that would play a C note. This is useful for representing chords
// and scales and whatnot in the abstract before grounding them somewhere exactly on a staff.
import { INote } from "./i_note";
import { Interval } from "./interval";

export const NotesToSemitones = {
  "C": 0,
  "C#": 1,
  "Db": 1,
  "D": 2,
  "D#": 3,
  "Eb": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "Gb": 6,
  "G": 7,
  "G#": 8,
  "Ab": 8,
  "A": 9,
  "A#": 10,
  "Bb": 10,
  "B": 11,
};

export const SemitonesToFlatNotes = Object.keys(NotesToSemitones).reduce((agg, note) => {
  if (!note.includes("#")) { agg[NotesToSemitones[note]] = note; }
  return agg;
}, {});

export const SemitonesToSharpNotes = Object.keys(NotesToSemitones).reduce((agg, note) => {
  if (!note.includes("b")) { agg[NotesToSemitones[note]] = note; }
  return agg;
}, {});

export class UnboundNote implements INote {
  public static fromString(noteString: string) {
    return new UnboundNote(noteString);
  }

  public symbol: string;
  public semitonesAboveC: number;

  constructor(normalizedSymbol) {
    this.symbol = normalizedSymbol;
    this.semitonesAboveC = NotesToSemitones[normalizedSymbol];
  }

  public bound() { return true; }
  public unbind() { return this; }

  public applyInterval(interval: Interval) {
    const positiveSemitones = (this.semitonesAboveC + interval.semitones) % 12;
    const newSymbol = this.symbol.includes("b") ? SemitonesToFlatNotes[positiveSemitones] : SemitonesToSharpNotes[positiveSemitones];

    return new UnboundNote(newSymbol);
  }
}

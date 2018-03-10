import { NoteSymbol } from "./note_symbol";
import { NotesToSemitones, SemitonesToSharpNotes } from "./unbound_note";

// Grab bag of methods that knows how to convert notes between their physical representation as an oscillation
// at a particular frequency and a symbolic repsentation in Scientific Pitch Notation, which is just a fancy way
// of saying something like C4 (middle C), A4 (the A above middle C), or Bb3.
export class FrequencyConverter {
  public static symbolForFrequency(frequency: number) {
    // h = 12 log(P / C) / log 2 if C is the frequency of middle C, but we use A = 440hz for accuracy,
    // which is 9 semitones away from C
    const semitonesAboveA4 = 12 * Math.log(frequency / 440) / Math.log(2);
    const semitonesAboveC4 = Math.round(semitonesAboveA4 + 9);
    const octavesAboveMiddleC = 4 + Math.round(semitonesAboveC4 / 12);
    const semitonesAboveC = semitonesAboveC4 % 12;

    const letter = SemitonesToSharpNotes[semitonesAboveC];
    if (!letter) { throw new Error("Incorrect internal calculation"); }
    return new NoteSymbol(letter, octavesAboveMiddleC);
  }

  public static frequencyForSymbol(symbol: NoteSymbol) {
    const semitonesAboveC = NotesToSemitones[symbol.letter];
    const octavesAboveC4 = 4 - symbol.octave;

    const semitonesAboveA4 = (semitonesAboveC - 9) + (octavesAboveC4 * 12);
    // Compute twelfth root of two relative to A4 at 440hz
    // P = C * 2^(h/12) if C is the frequency of middle C, but we use A = 440hz for accuracy
    // See https://en.wikipedia.org/wiki/Scientific_pitch_notation
    return Math.round(440 * 2 ** (semitonesAboveA4 / 12.0) * 1000) / 1000;
  }
}

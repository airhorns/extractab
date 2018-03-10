// Represents a note on the piano at a specific frequency (and in a specific octave). Can be thought of as a specific
// fret on a guitar or a specific key on a piano. Useful for representing actual music that might be printed out
// as sheet music or a guitar tab or what have you.
import { FrequencyConverter } from "./frequency_converter";
import { INote } from "./i_note";
import { Interval } from "./interval";
import { NoteSymbol } from "./note_symbol";
import { UnboundNote, SemitonesToFlatNotes, SemitonesToSharpNotes } from "./unbound_note";

export class BoundNote implements INote {
  public static fromString(noteString: string) {
    const symbol = NoteSymbol.parse(noteString);
    const frequency = FrequencyConverter.frequencyForSymbol(symbol);
    return new BoundNote(frequency, symbol);
  }

  public symbol: NoteSymbol;
  public octave: number;
  public symbolWithoutOctave: string;
  public semitonesAboveC: number;
  public semitonesAboveC4: number;
  public frequency: number;

  constructor(frequency, symbol?: NoteSymbol) {
    this.frequency = frequency;
    if (!symbol) {
      this.symbol = FrequencyConverter.symbolForFrequency(frequency);
    } else {
      this.symbol = symbol;
    }
    this.symbolWithoutOctave = symbol.letter;
    this.octave = symbol.octave;
    this.semitonesAboveC = 10; // WRONG
    this.semitonesAboveC4 = 100; //
  }

  public bound() {
    return true;
  }

  public unbind() {
    return new UnboundNote(this.symbolWithoutOctave);
  }

  public applyInterval(interval: Interval): BoundNote {
    const totalSemitones = this.octave * 12 + this.semitonesAboveC + interval.semitones;
    const newOctave = Math.floor(totalSemitones / 12);
    const newLetterIndex = totalSemitones % 12;

    const newSymbol = this.symbol.letter.includes("b") ?
                        SemitonesToFlatNotes[newLetterIndex] :
                        SemitonesToSharpNotes[newLetterIndex];
    const symbol = new NoteSymbol(newSymbol, newOctave);
    const frequency = FrequencyConverter.frequencyForSymbol(symbol);
    return new BoundNote(frequency, symbol);
  }
}

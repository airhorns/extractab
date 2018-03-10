// Represents a note on the piano at a specific frequency (and in a specific octave). Can be thought of as a specific
// fret on a guitar or a specific key on a piano. Useful for representing actual music that might be printed out
// as sheet music or a guitar tab or what have you.
import { INote } from './i_note';
import { UnboundNote } from './unbound_note';

export class BoundNote implements INote {
  symbol: string;
  octave: string;
  symbolWithoutOctave: string;
  semitonesAboveC: number;
  semitonesAboveC4: number;
  frequency: number;

  static fromString(string: string) {
    const symbol = NoteSymbol.parse(string);
    const frequency = FrequencyConverter.frequency_for_symbol(symbol)
    return new BoundNote(frequency, symbol);
  }

  constructor(frequency, symbol : NoteSymbol = undefined) {
    this.frequency = frequency;
    if(!symbol) {
      this.symbol = FrequencyConverter.symbolForFrequency(frequency);
    } else {
      this.symbol = symbol;
    }
    this.symbolWithoutOctave = symbol.letter;
    this.semitonesAboveC = 10; // WRONG
    this.semitonesAboveC4 = 100; //
  }

  bound() {
    return true;
  }

  unbind() {
    return new UnboundNote(this.symbolWithoutOctave);
  }

  applyInterval(interval: Interval): BoundNote {
    // def apply_interval(interval)
    //   new_octave, new_letter_index = (octave * 12 + semitones_above_c + interval.semitones).divmod(12)
    //   new_symbol = if symbol.letter.include? 'b'
    //     UnboundNote::SEMITONES_TO_FLAT_NOTES.fetch(new_letter_index)
    //   else
    //     UnboundNote::SEMITONES_TO_SHARP_NOTES.fetch(new_letter_index)
    //   end
    //
    //   symbol = NoteSymbol.new(new_symbol, new_octave)
    //   frequency = FrequencyConverter.frequency_for_symbol(symbol)
    //   self.class.new(frequency, symbol)
    // end

    const symbol = NoteSymbol.new(newSymbol, newOctave)
    const frequency = FrequencyConverter.frequencyForSymbol(symbol)
    return new UnboundNote(frequency, symbol);
  }
}

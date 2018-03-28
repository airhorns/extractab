// Small data structure to manage Scientific Pitch Notation (like C4, A4, Bb3 or what have you)
// and break it into the constituent parts: the unbound note (C), and the octave (4).

export class NoteSymbol {
  public static parse(noteString: string) {
    const match = this.NotePattern.exec(noteString);

    if (!match) { throw new Error(`Did not recognize note string ${noteString}`); }
    if (!match[2]) { throw new Error(`No octave found or specified`); }
    const octave = parseInt(match[2], 10);
    if (octave > 8 || octave < 0) { throw new Error(`Octave must be > 0 and < 9`); }

    return new NoteSymbol(match[1], octave);
  }

  private static NotePattern = /^([A-Ga-g][#b]?)([0-8]?)$/;
  private static AccidentalPattern = /^([A-Ga-g])([#b])?$/;
  public letter: string;
  public letterWithoutAccidental: string;
  public accidental: string;
  public octave: number;
  constructor(letter: string, octave: number) {
    this.octave = octave;
    const match = NoteSymbol.AccidentalPattern.exec(letter);
    if (!match) {
      throw new Error("Implementation error: letter couldn't be extracted from NoteSymbol string");
    }
    this.letterWithoutAccidental = match[1].toUpperCase();
    this.accidental = match[2];
    this.letter = this.accidental ? this.letterWithoutAccidental + this.accidental : this.letterWithoutAccidental;
  }

  public toString() {
    return `${this.letter}${this.octave}`;
  }

}

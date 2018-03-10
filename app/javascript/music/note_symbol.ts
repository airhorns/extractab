// Small data structure to manage Scientific Pitch Notation (like C4, A4, Bb3 or what have you)
// and break it into the constituent parts: the unbound note (C), and the octave (4).

export class NoteSymbol {
  public static parse(noteString: string) {
    const match = this.NotePattern.exec(noteString);

    if (!match) { throw new Error(`Did not recognize note string ${noteString}`); }
    if (!match[1]) { throw new Error(`No octave found or specified`); }
    const octave = parseInt(match[1], 10);
    if (octave > 8 || octave < 0) { throw new Error(`Octave must be > 0 and < 9`); }

    return new NoteSymbol(match[0], octave);
  }

  private static NotePattern = /^([A-Ga-g][#b]?)([0-8]?)$/;

  public letter: string;
  public octave: number;
  constructor(letter, octave) {
    this.letter = letter;
    this.octave = octave;
  }
}

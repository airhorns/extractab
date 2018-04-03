import * as ohm from "ohm-js";
import * as _ from "lodash";
import { BoundChord, ChordBindingError, BoundNote, UnboundChord, GuitarTuning, Interval } from "../music";
import { IFret } from "./i_fret";

// Represents a ChordDefinition found in a source text at a location
export class ChordDefinitionSourceMap {
  constructor(public source: ohm.Interval, public chordSource: ohm.Interval, public definition: ChordDefinition) {}
  public lineNumberForDisplay(): number {
    return (ohm as any).util.getLineAndColumn((this.source as any).sourceString, this.source.startIdx).lineNum - 1;
  }
}

// Represents a specific fingering of a chord on a guitar neck with fingers on specific frets.
// In guitar tabs, we're often given non-standard (interesting!) ways to play chords that are equivalent to
// the standard (sometimes boring!) chords that match the original artist's sound. This represents which
// frets to press on which strings. The actual BoundChord that knows exactly which notes are being played
// in which octaves can be computed with the //bind_at_tuning method, which needs a GuitarTuning to know
// what the open string notes are.
export class ChordDefinition {
  public constructor(public definedChord: UnboundChord, public fretting: IFret[]) {}

  public bindAtTuning(tuning: GuitarTuning): BoundChord {
    if (!(tuning.stringRoots.length >= this.fretting.length)) {
      throw new ChordBindingError("Can't bind definition because tuning doesn't have enough strings to be bound")
    }
    // Compute the bound note for each fret by adding an interval with the number of semitones equal to the fret number
    // to the open string. Example: 3rd fret on the E string is the note E + 3 semitones up, which in code would look
    // like `BoundNote.fromString("E4").applyInterval(new Interval(3))`;
    const notes: BoundNote[] = _(tuning.stringRoots).zip(this.fretting).map(([openString, fret]) => {
      if (openString && fret) {
        return openString.applyInterval(new Interval(fret.fret));
      }
    }).compact().sort(BoundNote.sorter).value();

    // Take a guess at what the root of the chord is. Since the tuning might be capo'd, the tab might have a mistake,
    // or some other inconsistency is present, the label for this chord definition might not be accurate, and we can't
    // assume that the root is present. So, look for the lowest note that has the same letter as the root listed in
    // the definition. Note that there might be lower notes from substitute roots or different voicings. If there are no
    // matching notes, just take the lowest note which is likely to have the root-like sound.
    const root: BoundNote = _.find(notes, (note) => note.unbind().equivalent(this.definedChord.root)) || notes[0];
    return new BoundChord(root, notes, this.definedChord.displayLabel());
  }
}

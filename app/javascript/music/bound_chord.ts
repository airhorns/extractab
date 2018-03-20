import { UnboundNote } from "./unbound_note";
import { BoundNote } from "./bound_note";
import { Interval, ChordNames, ChordIntervals } from "./interval";
import { INote } from "./i_note";
import { IChord } from "./i_chord";
import * as _ from "lodash";

// Represents a chord as a set of exact notes set at particular frequencies. Allows expression of particular voicings
// of a given chord with duplicates / omissions / nonstandard extensions / whatever.
// This is useful for representing chords in the concrete as voiced on a guitar or a piano.
// Notes are always sorted lowest to highest.
export class BoundChord implements IChord<BoundNote> {
  private noteList: ReadonlyArray<BoundNote>;

  constructor(public root: BoundNote, notes: BoundNote[], private passedDisplayLabel?: string) {
    const uniqAllNotes: BoundNote[] = _([root]).concat(notes).uniqWith((a, b) => a.equivalent(b)).sort(BoundNote.sorter).value();
    this.noteList = Object.freeze(uniqAllNotes);
  }

  public notes(): ReadonlyArray<BoundNote> {
    return this.noteList;
  }

  public notesString(): string {
    return this.notes().map((note) => note.symbol).join(" ");
  }

  public displayLabel(): string {
    if (this.passedDisplayLabel) {
      return this.passedDisplayLabel;
    } else {
      return "Unknown";
    }
  }

  public equivalent(other: IChord<any>): boolean {
    // Get a unique'd, sorted list of notes for comparison
    const normalize = (noteArray: ReadonlyArray<INote>) => {
      return _(noteArray)
        .map((note) => note.unbind())
        .uniqWith((a, b) => a.equivalent(b))
        .sort(UnboundNote.sorter)
        .value();
    };

    const otherNotes = normalize(other.notes());
    const notes = normalize(this.notes());

    return _(notes).zip(otherNotes).every((pair) => {
      const [a, b] = pair;
      if (a !== undefined && b !== undefined) {
        return a.equivalent(b);
      }
    });
  }
}

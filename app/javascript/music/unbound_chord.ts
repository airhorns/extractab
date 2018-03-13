import { UnboundNote } from "./unbound_note";
import { Interval, ChordNames, ChordIntervals } from "./interval";
import { INote } from "./i_note";
import { IChord } from "./i_chord";

// Represents a chord as a root plus a variable number of intervals (positive or negative). The chord isn't
// bound to a particular octave or guitar tuning or anything, it's just floating in space relative to the root.
// This is useful for representing chords in the abstract before dictating exactly how and where to play them on
// the neck of the guitar or the piano to make that "binding" step of deciding where along the neck or the piano
// the chord should actually sit.
// The intervals themselves are unbound and always sorted lowest to highest. Inversions can however be represented
// using some negative intervals and some positive intervals. the notes that would be above the root in the standard
// voicing of the chord can be given using the inverse (negative) interval such that they are now below the root.
export class UnboundChord implements IChord<UnboundNote> {
  public static forName(root: UnboundNote, name: ChordNames, substituteRoot?: UnboundNote) {
    let intervals = ChordIntervals[name];

    if (substituteRoot) {
      const newIntervals = intervals.slice(0);
      // Chord intervals are usually positive, but in order to get the substitute root as the lowest not, we get a
      // *downwards* interval from the root to the substitute root to add to the list of intervals. The "real"
      // root of the chord is still stored as the root so that information is preserved for naming and whatnot, but when
      // the notes of the chord are computed the substitute root will be the lowest note.
      const positiveToSubstituteRoot = Interval.fromUnboundNotes(root, substituteRoot);
      const negativeToSubstituteRoot = positiveToSubstituteRoot.invert();
      const index = newIntervals.findIndex((interval) => interval.isEqual(positiveToSubstituteRoot));
      if (index >= 0) { newIntervals.splice(index, 1); }
      newIntervals.push(negativeToSubstituteRoot);
      intervals = Object.freeze(newIntervals);
    }

    return new UnboundChord(root, intervals);
  }

  public intervals: ReadonlyArray<Interval>;

  constructor(public root: UnboundNote, intervals: Interval[] | ReadonlyArray<Interval>) {
    this.intervals = Object.freeze(intervals as Interval[]);
  }

  public notes(): UnboundNote[] {
    const notes = this.intervals.map((interval) => this.root.applyInterval(interval));
    notes.unshift(this.root);
    return notes;
  }

  public notesString(): string {
    return this.notes().map((note) => note.symbol).join(" ");
  }

  public equivalent(other: IChord<any>): boolean {
    const otherNotes = other.notes().map((note) => note.unbind()).sort(UnboundNote.sorter);
    const notes = this.notes().map((note) => note.unbind());

    return false;
  }
}

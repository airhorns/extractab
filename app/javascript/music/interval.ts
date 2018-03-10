// Represents an interval in music theory. Not limited to 12 semitones. See the Music::Intervals namespace for
// a bunch of named constants for the main intervals. Positive represents up the piano and negative represents down.
// Applies to both UnboundNotes and BoundNotes.
import { BoundNote } from "./bound_note";
import { INote } from "./i_note";
import { UnboundNote } from "./unbound_note";

export class Interval {
  public static fromUnboundNotes(from: UnboundNote, to: UnboundNote) {
    return new Interval(from.semitonesAboveC - to.semitonesAboveC);
  }

  public static fromBoundNotes(from: BoundNote, to: BoundNote) {
    return new Interval(from.semitonesAboveC4 - to.semitonesAboveC4);
  }

  public semitones: number;
  constructor(semitones: number) {
    this.semitones = semitones;
  }

  public invert() {
    const inverted = (this.semitones <= 0 ? (this.semitones - 12) : (this.semitones + 12)) % 12;
    return new Interval(inverted);
  }

  public positiveInversion() {
    return this.semitones < 0 ? this.invert() : this;
  }

  public add(other: Interval) {
    return new Interval(this.semitones + other.semitones);
  }
}

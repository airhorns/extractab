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
    let inverted = (this.semitones >= 0 ? (this.semitones - 12) : (this.semitones + 12)) % 12;
    if (inverted === 0) { inverted = 0; } // -12 % 12 returns -0, which is not equal in some libraries to 0 *wat*
    return new Interval(inverted);
  }

  public positiveInversion() {
    return this.semitones < 0 ? this.invert() : this;
  }

  public add(other: Interval) {
    return new Interval(this.semitones + other.semitones);
  }
}

export const Intervals = {
  MinorSecond: new Interval(1),
  MajorSecond: new Interval(2),
  MinorThird: new Interval(3),
  MajorThird: new Interval(4),
  PerfectFourth: new Interval(5),
  Tritone: new Interval(6),
  DiminishedFifth: new Interval(6),
  FlatFifth: new Interval(6),
  AugmentedFourth: new Interval(6),
  PerfectFifth: new Interval(7),
  AugmentedFifth: new Interval(8),
  MinorSixth: new Interval(8),
  MajorSixth: new Interval(9),
  DiminishedSeventh: new Interval(9),
  MinorSeventh: new Interval(10),
  MajorSeventh: new Interval(11),
  Octave: new Interval(12),
};

// Represents an interval in music theory. Not limited to 12 semitones. See the Music.Intervals namespace for
// a bunch of named constants for the main intervals. Positive represents up the piano and negative represents down.
// Applies to both UnboundNotes and BoundNotes.
import { BoundNote } from "./bound_note";
import { INote } from "./i_note";
import { UnboundNote } from "./unbound_note";

export class Interval {
  public static fromUnboundNotes(from: UnboundNote, to: UnboundNote) {
    return new Interval(to.semitonesAboveC - from.semitonesAboveC);
  }

  public static fromBoundNotes(from: BoundNote, to: BoundNote) {
    return new Interval(to.semitonesAboveC4 - from.semitonesAboveC4);
  }

  public static sorter = (a: Interval, b: Interval) => a.semitones - b.semitones;

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

  public isEqual(other: Interval) {
    return other.semitones === this.semitones;
  }
}

export const Intervals: { [s: string]: Interval } = {
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

export const enum ChordNames {
  Minor = "Minor",
  Major = "Major",
  Fifth = "Fifth",
  Diminished = "Diminished",
  Augmented = "Augmented",
  MajorSixth = "MajorSixth",
  MinorSixth = "MinorSixth",
  MajorSeventh = "MajorSeventh",
  MinorSeventh = "MinorSeventh",
  DiminishedSeventh = "DiminishedSeventh",
  AugmentedSeventh = "AugmentedSeventh",
  DominantSeventh = "DominantSeventh",
  MinorMajorSeventh = "MinorMajorSeventh",
  HalfDiminishedSeventh = "HalfDiminishedSeventh",
  MajorNinth = "MajorNinth",
  MinorNinth = "MinorNinth",
  Ninth = "Ninth",
  MajorEleventh = "MajorEleventh",
  MinorEleventh = "MinorEleventh",
  Eleventh = "Eleventh",
  MajorThirteenth = "MajorThirteenth",
  MinorThirteenth = "MinorThirteenth",
  Thirteenth = "Thirteenth",
}

export const ChordIntervals: { [key in ChordNames]: ReadonlyArray<Interval> } = Object.freeze({
  Minor: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth]),
  Major: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth]),
  Fifth: Object.freeze([Intervals.PerfectFifth]),
  Diminished: Object.freeze([Intervals.MinorThird, Intervals.DiminishedFifth]),
  Augmented: Object.freeze([Intervals.MajorThird, Intervals.AugmentedFifth]),
  MajorSixth: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSixth]),
  MinorSixth: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MajorSixth]),
  MajorSeventh: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh]),
  MinorSeventh: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]),
  DiminishedSeventh: Object.freeze([Intervals.MinorThird, Intervals.DiminishedFifth, Intervals.DiminishedSeventh]),
  AugmentedSeventh: Object.freeze([Intervals.MajorThird, Intervals.AugmentedFifth, Intervals.MinorSeventh]),
  DominantSeventh: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]),
  MinorMajorSeventh: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MajorSeventh]),
  HalfDiminishedSeventh: Object.freeze([Intervals.MinorThird, Intervals.DiminishedFifth, Intervals.MinorSeventh]),
  MajorNinth: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh, Intervals.Octave.add(Intervals.MajorSecond)]),
  MinorNinth: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.MajorSecond)]),
  Ninth: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.MajorSecond)]),
  MajorEleventh: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh, Intervals.Octave.add(Intervals.PerfectFourth)]),
  MinorEleventh: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.PerfectFourth)]),
  Eleventh: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.PerfectFourth)]),
  MajorThirteenth: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh, Intervals.Octave.add(Intervals.MajorSixth)]),
  MinorThirteenth: Object.freeze([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.MajorSixth)]),
  Thirteenth: Object.freeze([Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh, Intervals.Octave.add(Intervals.MajorSixth)]),
});

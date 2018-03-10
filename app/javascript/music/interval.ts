// Represents an interval in music theory. Not limited to 12 semitones. See the Music::Intervals namespace for
// a bunch of named constants for the main intervals. Positive represents up the piano and negative represents down.
// Applies to both UnboundNotes and BoundNotes.
import { INote } from './i_note'
import { UnboundNote } from './unbound_note'

export class Interval {
  semitones: number;

  static fromNotes(from: UnboundNote, to: UnboundNote) {
    return new Interval(from.semitonesAboveC - to.semitonesAboveC);
  }

  // static fromNotes(from: BoundNote, to: BoundNote) {
  //   return new Interval(from.semitonesAboveC4() - to.semitonesAboveC4());
  // }

  constructor(semitones: number) {
    this.semitones = semitones;
  }

  invert() {
    // def invert
    //   inverted = if semitones >= 0
    //     (semitones - 12).remainder(12)
    //   else
    //     (semitones + 12).remainder(12)
    //   end
    //
    //   self.class.new(inverted)
    // end

  }

  positiveInversion() {
    // def positive_inversion
    //   if semitones < 0
    //     invert
    //   else
    //     self
    //   end
    // end
  }

  add(other: Interval) {
    new Interval(this.semitones + other.semitones);
  }
}

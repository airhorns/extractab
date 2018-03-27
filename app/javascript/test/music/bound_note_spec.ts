import { UnboundNote, BoundNote, Interval, Intervals } from "../../music";
import { CommonNoteExamples } from "./common_note_examples";

describe("BoundNote", () => {
  const notes = {
    c: BoundNote.fromString("C4"),
    g: BoundNote.fromString("G4"),
    gFlat: BoundNote.fromString("Gb4"),
    gSharp: BoundNote.fromString("G#4"),
    aFlat: BoundNote.fromString("Ab4"),
    bFlat: BoundNote.fromString("Bb4"),
    aSharp: BoundNote.fromString("A#4"),
    otherC: BoundNote.fromString("C4"),
  };

  CommonNoteExamples(notes, BoundNote);

  it("notes should report their symbol and semitones above c", () => {
    expect(notes.c.symbol.toString()).toEqual("C4");
    expect(notes.g.symbol.toString()).toEqual("G4");
    expect(notes.gFlat.symbol.toString()).toEqual("Gb4");
    expect(notes.gSharp.symbol.toString()).toEqual("G#4");
  });

  it("can find notes using a symbol", () => {
    expect(BoundNote.fromString("C4").frequency).toEqual(261.626);
    expect(BoundNote.fromString("A4").frequency).toEqual(440);
  });

  it("can find notes using a frequency", () => {
    expect(new BoundNote(440).symbol.toString()).toEqual("A4");
    expect(new BoundNote(261.626).symbol.toString()).toEqual("C4");
  });

  it("can be unbound", () => {
    expect(notes.c.unbind()).toEqual(UnboundNote.fromString("C"));
    expect(notes.g.unbind()).toEqual(UnboundNote.fromString("G"));

    expect(BoundNote.fromString("G4").unbind()).toEqual(BoundNote.fromString("G3").unbind());
  });

  it("can have intervals applied", () => {
    expect(notes.c.applyInterval(Intervals.PerfectFifth)).toEqual(notes.g);
    expect(notes.g.applyInterval(new Interval(-7))).toEqual(notes.c);

    expect(notes.g.applyInterval(new Interval(-1)).equivalent(notes.gFlat));
    expect(notes.g.applyInterval(new Interval(1))).toEqual(notes.gSharp);

    expect(notes.c.applyInterval(Intervals.Octave)).toEqual(BoundNote.fromString("C5"));
    expect(notes.c.applyInterval(Intervals.Octave.add(Intervals.Octave))).toEqual(BoundNote.fromString("C6"));
  });

  it("rolls the octave over to the next one when apply intervals", () => {
    expect(notes.bFlat.applyInterval(Intervals.MajorThird)).toEqual(BoundNote.fromString("D5"));
    expect(notes.bFlat.applyInterval(Intervals.MajorSecond)).toEqual(BoundNote.fromString("C5"));
  });

  it("can be constructed from an unbound note and octave", () => {
    expect(BoundNote.fromUnboundNote(UnboundNote.fromString("C"), 4)).toEqual(notes.c);
    expect(BoundNote.fromUnboundNote(UnboundNote.fromString("G"), 4)).toEqual(notes.g);
    expect(BoundNote.fromUnboundNote(UnboundNote.fromString("C"), 3)).not.toEqual(notes.c);
  });
});

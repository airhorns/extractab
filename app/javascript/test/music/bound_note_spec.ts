import { UnboundNote, BoundNote } from "../../music";
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
});

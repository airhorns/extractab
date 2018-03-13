import { UnboundNote, BoundNote } from "../../music";
import { CommonNoteExamples } from "./common_note_examples";

describe("UnboundNote", () => {
  const notes = {
    c: UnboundNote.fromString("C"),
    g: UnboundNote.fromString("G"),
    gFlat: UnboundNote.fromString("Gb"),
    gSharp: UnboundNote.fromString("G#"),
    aFlat: UnboundNote.fromString("Ab"),
    bFlat: UnboundNote.fromString("Bb"),
    aSharp: UnboundNote.fromString("A#"),
    otherC: UnboundNote.fromString("C"),
  };

  CommonNoteExamples(notes, UnboundNote);

  it("notes should report their symbol and semitones above c", () => {
    expect("C").toEqual(notes.c.symbol);
    expect("G").toEqual(notes.g.symbol);
    expect("Gb").toEqual(notes.gFlat.symbol);
    expect("G#").toEqual(notes.gSharp.symbol);

    expect(0).toEqual(notes.c.semitonesAboveC);
    expect(7).toEqual(notes.g.semitonesAboveC);
    expect(6).toEqual(notes.gFlat.semitonesAboveC);
    expect(8).toEqual(notes.gSharp.semitonesAboveC);
  });

  it("can be created from bound notes", () => {
    const boundNote = BoundNote.fromString("A#4");
    const unboundNote = UnboundNote.fromString("A#");
    expect(unboundNote.symbol).toEqual(boundNote.symbolWithoutOctave);
    expect(unboundNote).toEqual(new UnboundNote(boundNote.symbolWithoutOctave));
  });
});

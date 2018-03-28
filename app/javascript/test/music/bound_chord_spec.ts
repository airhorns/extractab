import { UnboundNote, BoundNote, UnboundChord, BoundChord } from "../../music";

describe("BoundChord", () => {
  const c4 = BoundNote.fromString("C4");
  const e4 = BoundNote.fromString("E4");
  const g4 = BoundNote.fromString("G4");
  const g3 = BoundNote.fromString("G3");
  const b4 = BoundNote.fromString("B4");
  const dSharp4 = BoundNote.fromString("D#4");
  const g5 = BoundNote.fromString("G5");
  const c5 = BoundNote.fromString("C5");
  const c6 = BoundNote.fromString("C6");

  const cMajor = new BoundChord(c4, [e4, g4]);
  const cMinor = new BoundChord(c4, [dSharp4, g4]);
  const cMajor7 = new BoundChord(c4, [e4, g4, b4]);
  const bigCMajor = new BoundChord(c4, [e4, g4, c5, g5, c6]);

  it("should sort notes upon construction", () => {
    let unordered = new BoundChord(c4, [b4, e4, g4]);
    expect(unordered.notes()).toEqual([c4, e4, g4, b4]);

    unordered = new BoundChord(c4, [b4, g3, e4]);
    expect(unordered.notes()).toEqual([g3, c4, e4, b4]);
  });

  it("should allow notes of the same letter but in different octaves", () => {
    expect(bigCMajor.notes()).toEqual([c4, e4, g4, c5, g5, c6]);
  });

  it("should be equivalent when containing the same notes and same root", () => {
    const otherCMajor = new BoundChord(c4, [e4, g4]);
    expect(cMajor.equivalent(cMajor)).toEqual(true);
    expect(otherCMajor.equivalent(cMajor)).toEqual(true);
    expect(cMajor.equivalent(otherCMajor)).toEqual(true);

    expect(cMinor.equivalent(cMinor)).toEqual(true);
  });

  it("should be equivalent when constructing with duplicate notes (notes of the same frequency but different objects)", () => {
    const otherCMajor = new BoundChord(c4, [e4, g4, e4, g4, e4]);
    expect(otherCMajor.equivalent(cMajor)).toEqual(true);
    expect(cMajor.equivalent(otherCMajor)).toEqual(true);
  });

  it("should not be equivalent if the other has different notes", () => {
    expect(cMajor.equivalent(cMinor)).toEqual(false);
    expect(cMinor.equivalent(cMajor)).toEqual(false);
  });

  it("should not be equivalent if the other has the same letter notes but duplicated ones in different octaves", () => {
    expect(cMajor.equivalent(bigCMajor)).toEqual(false);
    expect(bigCMajor.equivalent(cMajor)).toEqual(false);
  });

  it("should not be equivalent if the other has extra or two few notes, even if the others are all the same", () => {
    expect(cMajor.equivalent(cMajor7)).toEqual(false);
    expect(cMajor7.equivalent(cMajor)).toEqual(false);
  });
});

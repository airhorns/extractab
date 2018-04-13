import { GuitarTuning, BoundNote, Interval } from "../../music";

describe("GuitarTuning", () => {
  const capo2 = new GuitarTuning([
    BoundNote.fromString("F#4"),
    BoundNote.fromString("C#4"),
    BoundNote.fromString("A3"),
    BoundNote.fromString("E3"),
    BoundNote.fromString("B2"),
    BoundNote.fromString("F#2"),
  ]);

  it("should be equivalent if it has the same root notes", () => {
    const otherStandard = new GuitarTuning([
      BoundNote.fromString("E4"),
      BoundNote.fromString("B3"),
      BoundNote.fromString("G3"),
      BoundNote.fromString("D3"),
      BoundNote.fromString("A2"),
      BoundNote.fromString("E2"),
    ]);

    expect(GuitarTuning.Standard.equivalent(GuitarTuning.Standard)).toEqual(true);
    expect(GuitarTuning.Standard.equivalent(otherStandard)).toEqual(true);
    expect(otherStandard.equivalent(GuitarTuning.Standard)).toEqual(true);

    expect(GuitarTuning.Standard.equivalent(GuitarTuning.DropD)).toEqual(false);
    expect(GuitarTuning.DropD.equivalent(GuitarTuning.Standard)).toEqual(false);

    expect(GuitarTuning.Standard.equivalent(GuitarTuning.Bass)).toEqual(false);
    expect(GuitarTuning.Bass.equivalent(GuitarTuning.Standard)).toEqual(false);
  });

  it("should be transposable", () => {
    expect(GuitarTuning.Standard.transpose(new Interval(0))).toEqual(GuitarTuning.Standard);

    expect(GuitarTuning.Standard.transpose(new Interval(2))).toEqual(capo2);
    expect(GuitarTuning.Standard.stringRoots[0].equivalent(BoundNote.fromString("E4"))).toEqual(true);
  });

  it("should have a string representation that matches convention of looking down at a guitar, starting with the lowest string going to the highest", () => {
    expect(GuitarTuning.Standard.tuningString()).toEqual("E A D G B E");
    expect(GuitarTuning.DropD.tuningString()).toEqual("D A D G B E");
  });
});

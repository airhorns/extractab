import { GuitarTuning } from "../../music";
import { AbcConverter, TabStaff, TabString, TabHit, TabLinkage } from "../../guitar_tab";

describe("AbcConverter", () => {
  const converter = new AbcConverter(GuitarTuning.Bass);

  it("converts basic staffs", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", []),
      new TabString("D", [new TabHit({fret: 3}, 4)]),
      new TabString("G", []),
    ]);

    const actual = `L:1/8
K:C
|:F:|`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with simultaneous notes", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 3}, 4)]),
      new TabString("D", [new TabHit({fret: 3}, 4)]),
      new TabString("G", []),
    ]);

    const actual = `L:1/8
K:C
|:[CF]:|`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with notes in high and low octaves", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 24}, 4), new TabHit({fret: 48}, 6)]),
      new TabString("D", [new TabHit({fret: 24}, 4), new TabHit({fret: 48}, 6)]),
      new TabString("G", []),
    ]);

    const actual = `L:1/8
K:C
|:[ad][a''d'']:|`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with accidentals notes", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 1}, 4)]),
      new TabString("D", []),
      new TabString("G", []),
    ]);

    const actual = `L:1/8
K:C
|:A^:|`;
    expect(converter.toABC(staff)).toEqual(actual);
  });
});

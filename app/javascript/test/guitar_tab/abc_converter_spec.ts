import { GuitarTuning } from "../../music";
import { AbcConverter, TabStaff, TabStaffBarLines, TabString, TabHit, TabLinkage } from "../../guitar_tab";

describe("AbcConverter", () => {
  const converter = new AbcConverter(GuitarTuning.Bass);

  it("converts basic staffs", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", []),
      new TabString("D", [new TabHit({fret: 3}, 4)]),
      new TabString("G", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|F|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with simultaneous notes", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 3}, 4)]),
      new TabString("D", [new TabHit({fret: 3}, 4)]),
      new TabString("G", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|[CF]|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with notes in high and low octaves", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 24}, 4), new TabHit({fret: 48}, 6)]),
      new TabString("D", [new TabHit({fret: 24}, 4), new TabHit({fret: 48}, 6)]),
      new TabString("G", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|[ad][a''d'']|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with accidentals notes", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("A", [new TabHit({fret: 1}, 4)]),
      new TabString("D", []),
      new TabString("G", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|^A|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with simple slurs", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [new TabHit({fret: 3}, 3, TabLinkage.Slide), new TabHit({fret: 4}, 5)]),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|(F^F)|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with dangling slurs", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [new TabHit({fret: 3}, 3, TabLinkage.Slide), new TabHit({fret: 4}, 5, TabLinkage.Slide)]),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|(F^F)|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

  it("converts staffs with multiple slurs", () => {
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [
        new TabHit({fret: 3}, 3, TabLinkage.Slide),
        new TabHit({fret: 4}, 5, TabLinkage.Slide),
        new TabHit({fret: 5}, 6),
        new TabHit({fret: 5}, 10, TabLinkage.Slide),
        new TabHit({fret: 4}, 12, TabLinkage.Slide),
        new TabHit({fret: 3}, 14),
      ]),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    const actual = `L:1/8
K:C
[|(F^FG)(G^FF)|]`;
    expect(converter.toABC(staff)).toEqual(actual);
  });

});

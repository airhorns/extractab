import Fixtures from "./fixtures";
import { Grammar, Semantics, TabStaff, TabString, TabHit, TabLinkage } from "../../guitar_tab";

const parseStaffDefinition = (str: string) => {
  const matchResult = Grammar.match(str   + "\n", "tabStaffLines");
  if (matchResult.succeeded()) {
    return Semantics(matchResult).buildTab();
  } else {
    throw new Error(matchResult.message);
  }
};

describe("TabParser TabStaff Definiton", () => {
  it("parses a simple hit on a fret at source position", () => {
    const actual = parseStaffDefinition(
`E|----|
D|----|
A|--3-|
E|----|`);

    const expected = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [new TabHit({fret: 3}, 4)]),
      new TabString("E", []),
    ]);

    expect(actual.staff).toEqual(expected);
  });

  it("parses hits with linkages between them", () => {
    const actual = parseStaffDefinition(
`E|----|
D|----|
A|-3/4|
E|----|`);

    const expected = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [new TabHit({fret: 3}, 3, TabLinkage.Slide), new TabHit({fret: 4}, 5)]),
      new TabString("E", []),
    ]);

    expect(actual.staff).toEqual(expected);
  });

  it("parses hits with linkages between them and a dangling linkage at the end", () => {
    const actual = parseStaffDefinition(
`E|-----|
D|-----|
A|-3/4/|
E|-----|`);

    const expected = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", [new TabHit({fret: 3}, 3, TabLinkage.Slide), new TabHit({fret: 4}, 5, TabLinkage.Slide)]),
      new TabString("E", []),
    ]);

    expect(actual.staff).toEqual(expected);
  });

  it("parses a C major scale across several strings", () => {
    const actual = parseStaffDefinition(
`e|---------------------------------|
B|--------------0-1-0--------------|
G|----------0-2-------2-0----------|
D|----0-2-3---------------3-2-0----|
A|--3---------------------------3--|
E|---------------------------------|`);

    const expected = new TabStaff([
      new TabString("e", []),
      new TabString("B", [
        new TabHit({fret: 0}, 16),
        new TabHit({fret: 1}, 18),
        new TabHit({fret: 0}, 20),
      ]),
      new TabString("G", [
        new TabHit({fret: 0}, 12),
        new TabHit({fret: 2}, 14),
        new TabHit({fret: 2}, 22),
        new TabHit({fret: 0}, 24),
      ]),
      new TabString("D", [
        new TabHit({fret: 0}, 6),
        new TabHit({fret: 2}, 8),
        new TabHit({fret: 3}, 10),
        new TabHit({fret: 3}, 26),
        new TabHit({fret: 2}, 28),
        new TabHit({fret: 0}, 30),
      ]),
      new TabString("A", [
        new TabHit({fret: 3}, 4),
        new TabHit({fret: 3}, 32),
      ]),
      new TabString("E", []),
    ]);

    expect(actual.staff).toEqual(expected);
  });

  it("parses a C major scale across several strings using linkages", () => {
    const actual = parseStaffDefinition(
`e|---------------------------------|
B|--------------0b1b0--------------|
G|----------0h2-------2p0----------|
D|----0/2/3---------------3p2/0----|
A|--3---------------------------3--|
E|---------------------------------|`);

    const expected = new TabStaff([
      new TabString("e", []),
      new TabString("B", [
        new TabHit({fret: 0}, 16, TabLinkage.Bend), new TabHit({fret: 1}, 18, TabLinkage.Bend), new TabHit({fret: 0}, 20),
      ]),
      new TabString("G", [
        new TabHit({fret: 0}, 12, TabLinkage.Slur), new TabHit({fret: 2}, 14),
        new TabHit({fret: 2}, 22, TabLinkage.Slur), new TabHit({fret: 0}, 24),
      ]),
      new TabString("D", [
        new TabHit({fret: 0}, 6, TabLinkage.Slide), new TabHit({fret: 2}, 8, TabLinkage.Slide), new TabHit({fret: 3}, 10),
        new TabHit({fret: 3}, 26, TabLinkage.Slur), new TabHit({fret: 2}, 28, TabLinkage.Slide), new TabHit({fret: 0}, 30),
      ]),
      new TabString("A", [
        new TabHit({fret: 3}, 4),
        new TabHit({fret: 3}, 32),
      ]),
      new TabString("E", []),
    ]);

    expect(actual.staff).toEqual(expected);
  });

});

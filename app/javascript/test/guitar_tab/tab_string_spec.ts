import { TabString, TabHit, TabLinkage } from "../../guitar_tab";

describe("TabString", () => {
  it("computes no linkages for a staff with none", () => {
    // A|--3-|
    let tabString = new TabString("A", [new TabHit({fret: 3}, 4)]);
    expect(tabString.computeLinkages()).toEqual([]);

    // A|--3-4-|
    tabString = new TabString("A", [new TabHit({fret: 3}, 4), new TabHit({fret: 4}, 6)]);
    expect(tabString.computeLinkages()).toEqual([]);
  });

  it("computes linkages for a staff with simple slurs", () => {
    // A|--3/4-|
    let tabString = new TabString("A", [new TabHit({fret: 3}, 4, TabLinkage.Slur), new TabHit({fret: 4}, 6)]);
    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 6}]);

    // A|--3/4/5-|
    tabString = new TabString("A", [new TabHit({fret: 3}, 4, TabLinkage.Slur), new TabHit({fret: 4}, 6, TabLinkage.Slur), new TabHit({fret: 5}, 8)]);
    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 8}]);

    // A|--3/4/5-6-5/4/3|
    tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 5}, 8),
      new TabHit({fret: 6}, 10),
      new TabHit({fret: 5}, 12, TabLinkage.Slur),
      new TabHit({fret: 4}, 13, TabLinkage.Slur),
      new TabHit({fret: 3}, 14),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 8}, {startColumn: 12, endColumn: 14}]);
  });

  it("computes linkages for a staff with slurs with small spaces inbetween", () => {
    // A|--3/4/--5---|
    let tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 5}, 10),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 10}]);

    // A|--3/4/-|-5---|
    tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 5}, 12),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 12}]);
  });

  it("computes linkages for a staff with inner slurs even if there are dangling slurs after", () => {
    // A|--3/4/--|
    let tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 6}]);

    // A|--3/4/---------------3/4/----|
    tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 3}, 20, TabLinkage.Slur),
      new TabHit({fret: 4}, 22, TabLinkage.Slur),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 6}, {startColumn: 20, endColumn: 22}]);

    // A|--3/4/---------------3/4/5/--------------3/4|
    tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 3}, 20, TabLinkage.Slur),
      new TabHit({fret: 4}, 22, TabLinkage.Slur),
      new TabHit({fret: 5}, 24, TabLinkage.Slur),
      new TabHit({fret: 3}, 40, TabLinkage.Slur),
      new TabHit({fret: 4}, 42, TabLinkage.Slur),
    ]);

    expect(tabString.computeLinkages()).toEqual([
      {startColumn: 4, endColumn: 6},
      {startColumn: 20, endColumn: 24 },
      {startColumn: 40, endColumn: 42  },
    ]);
  });

  it("doesn't compute linkages for a staff with slurs with big spaces inbetween", () => {
    // A|--3/4/------------5---|
    const tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
      new TabHit({fret: 4}, 6, TabLinkage.Slur),
      new TabHit({fret: 5}, 25),
    ]);

    expect(tabString.computeLinkages()).toEqual([{startColumn: 4, endColumn: 6}]);
  });

  it("doesn't compute linkages for a staff with dangling slurs", () => {
    // A|--3/-|
    const tabString = new TabString("A", [
      new TabHit({fret: 3}, 4, TabLinkage.Slur),
    ]);

    expect(tabString.computeLinkages()).toEqual([]);
  });

});

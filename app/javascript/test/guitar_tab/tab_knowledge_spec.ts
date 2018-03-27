import { GuitarTuning, BoundNote } from "../../music";
import { TabParser, TabStaff, TabStaffBarLines, TabString, TabKnowledge, ITuningGuess } from "../../guitar_tab";
import Fixtures from "./fixtures";

const parseAndInfer = (text: string) => {
  const result = (new TabParser()).parse(text);
  return TabKnowledge.infer(result.sections);
};

const capo2 = new GuitarTuning([
  BoundNote.fromString("F#4"),
  BoundNote.fromString("C#4"),
  BoundNote.fromString("A3"),
  BoundNote.fromString("E3"),
  BoundNote.fromString("B2"),
  BoundNote.fromString("F#2"),
]);

const capo3 = new GuitarTuning([
  BoundNote.fromString("G4"),
  BoundNote.fromString("D4"),
  BoundNote.fromString("A#3"),
  BoundNote.fromString("F3"),
  BoundNote.fromString("C3"),
  BoundNote.fromString("G2"),
]);

describe("TabKnowledge", () => {
  it("identifies standard guitar tuning correctly", () => {
    let staff = new TabStaff([
      new TabString("E", []),
      new TabString("B", []),
      new TabString("G", []),
      new TabString("D", []),
      new TabString("A", []),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    expect(TabKnowledge.tuningFromTabStrings(staff).tuning).toEqual(GuitarTuning.Standard);

    staff = new TabStaff([
      new TabString("e", []),
      new TabString("B", []),
      new TabString("G", []),
      new TabString("D", []),
      new TabString("A", []),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    expect(TabKnowledge.tuningFromTabStrings(staff).tuning).toEqual(GuitarTuning.Standard);

    staff = new TabStaff([
      new TabString("G", []),
      new TabString("D", []),
      new TabString("A", []),
      new TabString("E", []),
    ], new TabStaffBarLines([]));

    expect(TabKnowledge.tuningFromTabStrings(staff).tuning).toEqual(GuitarTuning.Bass);
  });

  it("identifies custom tab staff tunings correctly", () => {
    // not a real instrument
    const staff = new TabStaff([
      new TabString("E", []),
      new TabString("D", []),
      new TabString("A", []),
      new TabString("E", []),
      new TabString("C", []),
    ], new TabStaffBarLines([]));

    expect(TabKnowledge.tuningFromTabStrings(staff).tuning).toEqual(new GuitarTuning([
      BoundNote.fromString("E2"),
      BoundNote.fromString("D3"),
      BoundNote.fromString("A3"),
      BoundNote.fromString("E4"),
      BoundNote.fromString("C5"),
    ]));
  });

  it("identifies tunings from capo descriptions in unrecognized sections", () => {
    expect((TabKnowledge.tuningFromText("blah blah Capo 3 blah blah") as ITuningGuess).tuning).toEqual(capo3);
    expect((TabKnowledge.tuningFromText("Capo 3") as ITuningGuess).tuning).toEqual(capo3);
    expect((TabKnowledge.tuningFromText("the Capo 3rd thing") as ITuningGuess).tuning).toEqual(capo3);

    expect((TabKnowledge.tuningFromText("capo 12") as ITuningGuess).tuning.stringRoots[0]).toEqual(BoundNote.fromString("E5"));
  });

  it("doesnt identify tunings from words that look like capo descriptions but arent", () => {
    expect(TabKnowledge.tuningFromText("blah blah somethingcapo 3 blah blah")).toEqual(undefined);
    expect(TabKnowledge.tuningFromText("don't use a capo please")).toEqual(undefined);
  });

  it("correctly identifies crossfire.txt's tuning", () => {
    expect(parseAndInfer(Fixtures.crossfire).tuning).toEqual(GuitarTuning.Standard);
  });

  fit("correctly identifies fallingInLove.txt's tuning", () => {
    expect(parseAndInfer(Fixtures.fallingInLove).tuning).toEqual(capo2);
  });
});

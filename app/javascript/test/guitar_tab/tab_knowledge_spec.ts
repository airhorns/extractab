import { GuitarTuning, UnboundNote, ChordNames, UnboundChord, BoundNote, Interval } from "../../music";
import { TabParser, TabStaff, TabStaffBarLines, TabString, TabKnowledge, ITuningGuess } from "../../guitar_tab";
import Fixtures from "./fixtures";

const parseAndInfer = (text: string) => {
  const result = (new TabParser()).parse(text);
  return TabKnowledge.infer(result.sections);
};

const c = UnboundNote.fromString("C");
const a = UnboundNote.fromString("A");
const cMajor = UnboundChord.forName(c, ChordNames.Major);
const cMinor = UnboundChord.forName(c, ChordNames.Minor);

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

  it("correctly identifies fallingInLove.txt's tuning", () => {
    expect(parseAndInfer(Fixtures.fallingInLove).tuning).toEqual(capo2);
  });

  it("notes that the tuning is from the default if no tuning is found", () => {
    expect(parseAndInfer("").tuningLabel).toEqual("");
  });

  it("notes that the tuning is from the tab if it is found from a tab and only if it is a nonstandard tuning", () => {
    expect(parseAndInfer(Fixtures.crossfire).tuningLabel).toEqual("");
    expect(parseAndInfer(Fixtures.neon).tuningLabel).toEqual("found in tab");
  });

  it("notes that the tuning is capo 2 when the tuning is found from a capo notation", () => {
    expect(parseAndInfer(Fixtures.fallingInLove).tuningLabel).toEqual("Capo 2");
  });

  it("can be transposed such that the tuning changes up or down a number of semitones", () => {
    const original = TabKnowledge.Default;
    const originalFirstString = original.tuning.stringRoots[0].frequency;

    const upTwo = original.transposeTuning(2);
    expect(upTwo.tuning.stringRoots[0]).toEqual(original.tuning.stringRoots[0].applyInterval(new Interval(2)));
    expect(upTwo.tuning.stringRoots[1]).toEqual(original.tuning.stringRoots[1].applyInterval(new Interval(2)));
    expect(upTwo.tuning.stringRoots[2]).toEqual(original.tuning.stringRoots[2].applyInterval(new Interval(2)));

    const downThree = original.transposeTuning(-3);
    expect(downThree.tuning.stringRoots[0]).toEqual(original.tuning.stringRoots[0].applyInterval(new Interval(-3)));

    expect(original.tuning.stringRoots[0].frequency).toEqual(originalFirstString);
  });

  it("changes the tuning label when transposed to include a note about being transposed", () => {
    expect(TabKnowledge.Default.transposeTuning(2).tuningLabel).toEqual("transpose +2");
    expect(TabKnowledge.Default.transposeTuning(-2).tuningLabel).toEqual("transpose -2");

    expect(parseAndInfer(Fixtures.neon).transposeTuning(2).tuningLabel).toEqual("found in tab transpose +2");
    expect(parseAndInfer(Fixtures.neon).transposeTuning(-2).tuningLabel).toEqual("found in tab transpose -2");
  });

  it("can bind chords not seen anywhere in the tab", () => {
    expect(TabKnowledge.Default.bindChord(cMajor)).toEqual(cMajor.bindAtRootOctave(3));
  });
});

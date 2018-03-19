import Fixtures from "./fixtures";
import { Grammar, Semantics, ChordDefinitionSection, ChordDefinition } from "../../guitar_tab";
import { UnboundChord, UnboundNote, ChordNames } from "../../music";

const parseChordDefinition = (str: string) => {
  const matchResult = Grammar.match(str   + "\n", "chordDefinitionLines");
  if (matchResult.succeeded()) {
    return Semantics(matchResult).buildTab();
  } else {
    throw new Error(matchResult.message);
  }
};

describe("TabParser Chord Definion", () => {
  it("parses simple chord definitions with 6 string single digit frets", () => {
    const actual = parseChordDefinition(`A6      xx767x
Amaj7   5x665x`);

    const expected = [
      new ChordDefinition(
        UnboundChord.forName(UnboundNote.fromString("A"), ChordNames.MajorSixth),
        [null, null, {fret: 7}, {fret: 6}, {fret: 7}, null],
      ),
      new ChordDefinition(
        UnboundChord.forName(UnboundNote.fromString("A"), ChordNames.MajorSeventh),
        [{fret: 5}, null, {fret: 6}, {fret: 6}, {fret: 5}, null],
      )];

    expect(actual.definitions).toEqual(expected);
  });

  it("parses dashed chord definitions with 6 string multi digit frets", () => {
    const actual = parseChordDefinition(`C#m7   9-11-9-9-9-9
F#7    x-9-9-9-9-11
F#7    x-9-9-9-9-x`);

    const expected = [
      new ChordDefinition(
        UnboundChord.forName(UnboundNote.fromString("C#"), ChordNames.MinorSeventh),
        [{fret: 9}, {fret: 11}, {fret: 9}, {fret: 9}, {fret: 9}, {fret: 9}],
      ),
      new ChordDefinition(
        UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.DominantSeventh),
        [null, {fret: 9}, {fret: 9}, {fret: 9}, {fret: 9}, {fret: 11}],
      ),
      new ChordDefinition(
        UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.DominantSeventh),
        [null, {fret: 9}, {fret: 9}, {fret: 9}, {fret: 9}, null],
      ),
    ];

    expect(actual.definitions).toEqual(expected);
  });
});

import Fixtures from "./fixtures";
const Grammar = require("../../guitar_tab/grammar"); // tslint:disable-line

const expectParses = (tab: string, grammar = Grammar) => {
  const parseResult = grammar.match(tab + "\n");
  if (!parseResult.succeeded()) {
    fail(`Parsing """${tab}""" failed: ${parseResult.message}`);
  }
  expect(parseResult.succeeded()).toBe(true);
};

describe("Grammar", () => {
  it("parses basic strings", () => {
    expectParses("foo");
    expectParses("[Input]");
    expectParses("\n[Input]");
    expectParses("\n\n[Input]");
    expectParses("[Input]\n\n\n\n");
    expectParses("\n\n[Input]\n\n");
  });

  it("parses multiple empty sections with different headers", () => {
    expectParses(`[Input][Verse][Chorus]`);
    expectParses(`[Input]\n[Verse]\n[Chorus]`);
    expectParses(`[Input]\n\n[Verse]\n\n[Chorus]\n\n`);
    expectParses(`[Input][Verse][Chorus]\n\n`);
  });

  it("parses multiple simple sections with different headers", () => {
    expectParses(`
[Intro]
Em Bb Cm
[Verse]
Em A Cm`);

    expectParses(`
[Intro]
  Em Bb Cm
[Verse]
  Em A Cm`);

    expectParses(`
    [Intro]
Em Bb Cm
  [Verse]
Em A Cm`);
  });

  it("parses real world fixtures", () => {
    for (const fixture of Object.values(Fixtures)) {
      expectParses(fixture);
    }
  });
});

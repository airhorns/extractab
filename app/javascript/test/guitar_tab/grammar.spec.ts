const Grammar = require('../../guitar_tab/grammar');
import Fixtures from './fixtures';

function expectParses(string, grammar = Grammar) {
  const parseResult = grammar.match(string + "\n");
  if(!parseResult.succeeded()) {
    fail(`Parsing """${string}""" failed: ${parseResult.message}`);
  }
  expect(parseResult.succeeded()).toBe(true);
}
describe("Grammar", function() {
  it("parses basic strings", function() {
    expectParses("foo");
    expectParses("[Input]");
    expectParses("\n[Input]");
    expectParses("\n\n[Input]");
    expectParses("[Input]\n\n\n\n");
    expectParses("\n\n[Input]\n\n");
  });

  it("parses multiple empty sections with different headers", function() {
    expectParses(`[Input][Verse][Chorus]`);
    expectParses(`[Input]\n[Verse]\n[Chorus]`);
    expectParses(`[Input]\n\n[Verse]\n\n[Chorus]\n\n`);
    expectParses(`[Input][Verse][Chorus]\n\n`);
  });

  it("parses multiple empty sections with different headers", function() {
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

  it("parses real world fixtures", function() {
    for(const fixtureName in Fixtures) {
      expectParses(Fixtures[fixtureName]);
    }
  });
});

import { Parser } from "../../guitar_tab";

describe("GuitarTabParser", function() {
  it("parses floofy strings", function() {
    const parseResult = new Parser().parse("foo\n\n");
    expect(parseResult.succeeded).toBe(true);
  });
});

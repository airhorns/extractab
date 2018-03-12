import { Parser } from "../../guitar_tab";

describe("GuitarTabParser", () => {
  it("parses floofy strings", () => {
    const parseResult = new Parser().parse("foo\n\n");
    expect(parseResult.succeeded).toBe(true);
  });
});

import Fixtures from "./fixtures";
import { TabParser } from "../../guitar_tab";

describe("TabParser", () => {
  it("parses simple strings and reports success", () => {
    let parseResult = new TabParser().parse("foo\n\n");
    expect(parseResult.succeeded).toBe(true);

    parseResult = new TabParser().parse("[Cool Tab] foo\nC B G\nCool song\n");
    expect(parseResult.succeeded).toBe(true);
  });

  Object.entries(Fixtures).forEach(([name, fixture]) => {
    it(`parses and section-izes real world fixture ${name}`, () => {
      const parseResult = new TabParser().parse(fixture);
      expect(parseResult.succeeded).toBe(true);
    });
  });

  // see other tab_parser_* files for more specific tests
});

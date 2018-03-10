import ParseResult from "./parse_result";
const Grammar = require("./grammar"); // tslint:disable-line
const Semantics = Grammar.createSemantics();

Semantics.addOperation("buildTab", {
  lineDelimitedSection_headerless(preWhitespace, chording, postWhitespace) { return null; },
  unrecognizedSection_headerless(lines, postWhitespace) { return null; },
});

export class Parser {
  public parse(str) {
    const matchResult = Grammar.match(str + "\n");
    let tabAST;
    if (matchResult.succeeded()) {
      tabAST = Semantics(matchResult).buildTab();
    }
    return new ParseResult(matchResult, tabAST);
  }
}

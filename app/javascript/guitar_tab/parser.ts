import ParseResult from "./parse_result";
const Grammar = require("./grammar"); // tslint:disable-line
const Semantics = Grammar.createSemantics();

Semantics.addOperation("buildTab", {
  lineDelimitedSection_headerless(preWhitespace: any, chording: any, postWhitespace: any): any { return null; },
  unrecognizedSection_headerless(lines: any, postWhitespace: any): any { return null; },
});

export class Parser {
  public parse(str: string) {
    const matchResult = Grammar.match(str + "\n");
    let tabAST;
    if (matchResult.succeeded()) {
      tabAST = Semantics(matchResult).buildTab();
    }
    return new ParseResult(matchResult, tabAST);
  }
}

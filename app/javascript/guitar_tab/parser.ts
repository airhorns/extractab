import ParseResult from "./parse_result";
const Grammar = require('./grammar');
const Semantics = Grammar.createSemantics();

const unit = function(x) { return x };
Semantics.addOperation('buildTab', {
  lineDelimitedSection_headerless: function(preWhitespace, chording, postWhitespace) { },
  unrecognizedSection_headerless: function(lines, postWhitespace) { },
});

export class Parser {
  parse(str) {
    const matchResult = Grammar.match(str + "\n");
    var tabAST;
    if(matchResult.succeeded()) {
      tabAST = Semantics(matchResult).buildTab();
    }
    return new ParseResult(matchResult, tabAST);
  }
};

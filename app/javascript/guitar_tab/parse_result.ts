export default class ParseResult {
  succeeded: boolean;
  matchResult;
  tabAST;
  constructor(matchResult, tabAST) {
    this.matchResult = matchResult;
    this.succeeded = matchResult.succeeded()
    this.tabAST = tabAST;
  }
}

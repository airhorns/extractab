export default class ParseResult {
  public succeeded: boolean;
  public matchResult;
  public tabAST;
  constructor(matchResult, tabAST) {
    this.matchResult = matchResult;
    this.succeeded = matchResult.succeeded();
    this.tabAST = tabAST;
  }
}

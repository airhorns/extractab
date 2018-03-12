export default class ParseResult {
  public succeeded: boolean;
  constructor(public matchResult: any, public tabAST: any) {
    this.succeeded = matchResult.succeeded();
  }
}

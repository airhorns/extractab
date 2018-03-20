import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";

export class TabParseResult {
  public succeeded: boolean;
  constructor(public matchResult: ohm.MatchResult, public sections: TabSection[] ) {
    this.succeeded = matchResult.succeeded();
  }
}

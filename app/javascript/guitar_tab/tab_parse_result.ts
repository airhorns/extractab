import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";
import { TabKnowledge } from "./tab_knowledge";

export class TabParseResult {
  public succeeded: boolean;
  constructor(public matchResult: ohm.MatchResult, public sections: TabSection[], public knowledge: TabKnowledge) {
    this.succeeded = matchResult.succeeded();
  }
}

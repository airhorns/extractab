import * as ohm from "ohm-js";
import { ITabSection } from "./i_tab_section";

export class TabParseResult {
  public succeeded: boolean;
  constructor(public matchResult: ohm.MatchResult, public sections: ITabSection[] ) {
    this.succeeded = matchResult.succeeded();
  }
}

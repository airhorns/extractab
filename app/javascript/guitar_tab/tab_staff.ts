import * as _ from "lodash";
import { TabHit } from "./tab_hit";
import { TabString } from "./tab_string";
import { TabStaffBarLines } from "./tab_staff_bar_lines";

// Represents a time ordered list of string-plucks along several strings at given frets
export class TabStaff {
  constructor(public strings: TabString[], public barLines: TabStaffBarLines) {}

  public tuningString(): string {
    return this.strings.map((tabString) => tabString.tuning).join(" ");
  }
}

import { TabHit } from "./tab_hit";
import { TabString } from "./tab_string";

// Represents a time ordered list of string-plucks along several strings at given frets
export class TabStaff {
  constructor(public strings: TabString[]) {

  }
}

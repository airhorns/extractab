import { Interval } from "ohm-js";
import { ITabSection } from "./i_tab_section";

export class ChordSection implements ITabSection {
  constructor(public source: Interval) {}
}

import { Interval } from "ohm-js";
import { TabSection } from "./tab_section";

export class UnrecognizedSection extends TabSection {
  constructor(public source: Interval) { super(); }
}

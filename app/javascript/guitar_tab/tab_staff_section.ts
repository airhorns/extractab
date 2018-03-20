import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";
import { TabStaff } from "./tab_staff";

export class TabStaffSection extends TabSection {
  constructor(public source: ohm.Interval, public staff: TabStaff) {
    super()
  }
}

import * as ohm from "ohm-js";
import { ITabSection } from "./i_tab_section";
import { TabStaff } from "./tab_staff";

export class TabStaffSection implements ITabSection {
  constructor(public source: ohm.Interval, public staff: TabStaff) {
  }
}

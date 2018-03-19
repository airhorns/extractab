import * as ohm from "ohm-js";
import { ITabSection } from "./i_tab_section";
import { ChordDefinition } from "./chord_definition";

export class ChordDefinitionSection implements ITabSection {
  constructor(public source: ohm.Interval, public definitions: ChordDefinition[]) {
  }
}

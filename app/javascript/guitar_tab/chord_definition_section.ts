import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";
import { ChordDefinition } from "./chord_definition";

export class ChordDefinitionSection extends TabSection {
  constructor(public source: ohm.Interval, public definitions: ChordDefinition[]) {
    super();
  }
}

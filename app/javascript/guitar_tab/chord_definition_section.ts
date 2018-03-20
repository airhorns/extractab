import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";
import { ChordDefinitionSourceMap } from "./chord_definition";

export class ChordDefinitionSection extends TabSection {
  constructor(public source: ohm.Interval, public definitionMaps: ChordDefinitionSourceMap[] ) {
    super();
  }
}

import * as ohm from "ohm-js";
import { SectionHeader } from "./section_header";

export abstract class TabSection {
  public source: ohm.Interval;
  public header?: SectionHeader;
  public key(): string {
    return this.source.startIdx.toString();
  }
  public lineNumberForDisplay() {
    return ohm.util.getLineAndColumn(this.source.sourceString, this.source.startIdx).lineNum - 1;
  }
}

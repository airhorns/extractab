import * as ohm from "ohm-js";

export abstract class TabSection {
  public source: ohm.Interval;
  public lineNumberForDisplay() {
    return (ohm as any).util.getLineAndColumn((this.source as any).sourceString, this.source.startIdx).lineNum;
  }
}

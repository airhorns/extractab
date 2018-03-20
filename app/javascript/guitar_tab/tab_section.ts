import * as ohm from "ohm-js";

export abstract class TabSection {
  public source: ohm.Interval;
  public key(): string {
    return this.source.contents;
  }
  public lineNumberForDisplay() {
    return (ohm as any).util.getLineAndColumn((this.source as any).sourceString, this.source.startIdx).lineNum - 1;
  }
}

import * as ohm from "ohm-js";

export abstract class TabSection {
  public source: ohm.Interval;
  public headerSource?: ohm.Interval;
  public key(): string {
    return this.source.contents;
  }
  public lineNumberForDisplay() {
    return ohm.util.getLineAndColumn(this.source.sourceString, this.source.startIdx).lineNum - 1;
  }
}

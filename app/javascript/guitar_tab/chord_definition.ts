import * as ohm from "ohm-js";
import { UnboundChord } from "../music";
import { IFret } from "./i_fret";

export class ChordDefinitionSourceMap {
  constructor(public source: ohm.Interval, public definition: ChordDefinition) {}
  public lineNumberForDisplay(): number {
    return (ohm as any).util.getLineAndColumn((this.source as any).sourceString, this.source.startIdx).lineNum - 1;
  }
}

export class ChordDefinition {
  public constructor(public definedChord: UnboundChord, public fretting: IFret[]) {

  }
}

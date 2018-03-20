import { UnboundChord } from "../music";
import { IFret } from "./i_fret";

export class ChordDefinition {
  public constructor(public definedChord: UnboundChord, public fretting: IFret[]) {

  }
}

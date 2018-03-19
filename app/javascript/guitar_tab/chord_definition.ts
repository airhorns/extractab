import { UnboundChord } from "../music";

export interface ISomeFret {
  fret: number;
}
export type INoFret = null;
export type IFret = ISomeFret | INoFret;

export class ChordDefinition {
  public constructor(public definedChord: UnboundChord, public fretting: IFret[]) {

  }
}

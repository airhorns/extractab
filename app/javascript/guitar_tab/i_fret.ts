export interface ISomeFret {
  fret: number;
}
export type INoFret = null;
export type IFret = ISomeFret | INoFret;

import * as ohm from "ohm-js";
import { ISomeFret } from "./i_fret";

export enum TabLinkage {
  Bend = "Bend",
  Slide = "Slide",
  Slur = "Slur",
}

// Represents an individual pluck of a string shortened to a certain fret along a tab, optionally with a musical linkage
// to the next note played via a bend or slur or what have you.
export class TabHit {
  constructor(public fret: ISomeFret, public sourceColumn: number, public linkage?: TabLinkage) {}
}

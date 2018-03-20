import * as ohm from "ohm-js";
import { ISomeFret } from "./i_fret";

// Represents an individual pluck of a string shortened to a certain fret along a tab
export enum TabLinkage {
  Bend = "Bend",
  Slide = "Slide",
  Slur = "Slur",
}

export class TabHit {
  constructor(public frets: ISomeFret[], public linkages: TabLinkage[], public sourceColumn: number) {
    if (linkages.length > frets.length || linkages.length < (frets.length - 1)) {
      throw new Error(`Mismatched size of linkages (${linkages.length}) vs frets (${frets.length}) for TabHit`);
    }
  }
}

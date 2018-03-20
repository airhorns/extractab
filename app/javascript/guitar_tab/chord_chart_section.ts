import * as ohm from "ohm-js";
import { ITabSection } from "./i_tab_section";
import { UnboundChord } from "../music";

export class ChordSource {
  constructor(public chord: UnboundChord, public source: ohm.Interval) {}
}

export class LyricLine {
  constructor(public lyrics: string, public source: ohm.Interval) {}
}

export type ChordLine = ChordSource[];
export type ChordChartLine = ChordLine | LyricLine;

export class ChordChartSection implements ITabSection {
  constructor(public source: ohm.Interval, public lines: ChordChartLine[]) {
  }
}

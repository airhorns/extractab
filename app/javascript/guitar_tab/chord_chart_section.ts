import * as ohm from "ohm-js";
import { TabSection } from "./tab_section";
import { UnboundChord } from "../music";

export class ChordSource {
  constructor(public chord: UnboundChord, public source: ohm.Interval) {}
}

export class LyricLine {
  constructor(public lyrics: string, public source: ohm.Interval) {}
}

export type ChordLine = ChordSource[];
export type ChordChartLine = ChordLine | LyricLine;

export const isChordLine = (line: ChordChartLine): line is ChordLine => {
  return (line as LyricLine).lyrics === undefined;
};

export class ChordChartSection extends TabSection {
  constructor(public source: ohm.Interval, public lines: ChordChartLine[]) {
    super();
  }
}

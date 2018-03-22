import * as _ from "lodash";
import { TabStaff } from "./tab_staff";
import { TabString } from "./tab_string";
import { Interval, BoundNote, GuitarTuning } from "../music";
import { TabLinkage } from "./tab_hit";

class BoundTabHit {
  constructor(public note: BoundNote, public sourceColumn: number, public linkage?: TabLinkage) {}
}

const allIndexesOf = (character: string, sourceString: string) => {
  const indices = [];
  for (let i = 0; i < sourceString.length; i++) {
      if (sourceString[i] === character) { indices.push(i) }
  }
  return indices;
};

export class AbcConverter {
  constructor(public tuning: GuitarTuning) {}
  // Bind the various fretted hits along each string to the tuning, and then build an ABC notation string to send into abcjs
  public toABC(tabStaff: TabStaff): string {
    // Get bound notes for each hit along the string
    if (this.tuning.stringRoots.length !== tabStaff.strings.length) {
      throw new Error("Can't convert tabstaff with different sized tuning to ABC");
    }

    const boundHits: BoundTabHit[] = _.chain(this.tuning.stringRoots)
      .zip(tabStaff.strings)
      .map(this.bindHitsAtRoot)
      .flatten()
      .compact()
      .value();

    const hitsByColumn = boundHits.reduce((columns, hit) => {
      if (!columns[hit.sourceColumn]) {
        columns[hit.sourceColumn] = [];
      }
      columns[hit.sourceColumn].push(hit);
      return columns;
    }, [] as BoundTabHit[][]);

    // Traverse each string in time and echo out ABC representation of bound notes
    const output: string[] = [];
    output.push("L:1/8\n"); // 8th note resolution
    output.push("K:C\n");   // no key for now
    output.push("|:");    // start the music
    hitsByColumn.forEach((hitList, index) => {
      if (hitList.length > 1) {
        output.push("[");
      }
      hitList.forEach((hit) => output.push(this.abcSymbolForNote(hit.note)));
      if (hitList.length > 1) {
        output.push("]");
      }
    });
    output.push(":|");    // end the music
    return output.join("");
  }

  private bindHitsAtRoot(args: [BoundNote, TabString]): BoundTabHit[] {
    const [root, tabString] = args;
    if (root && tabString) {
      return tabString.hits.map((hit) => {
        const note = root.applyInterval(new Interval(hit.fret.fret));
        return new BoundTabHit(note, hit.sourceColumn, hit.linkage);
      });
    } else {
      return [];
    }
  }

  private abcSymbolForNote(note: BoundNote): string {
    // MiddleC = "C" = C3 = the c below the treble clef
    let symbol: string;
    let modifiers: string;
    if (note.octave >= 4) {
      symbol = note.symbol.letterWithoutAccidental.toLowerCase();
      modifiers = "'".repeat(Math.max(0, note.octave - 4));
    } else {
      symbol = note.symbol.letterWithoutAccidental.toUpperCase();
      modifiers = ",".repeat(Math.max(0, note.octave - 4));
    }
    let accidental = "";
    if (note.symbol.accidental === "#") {
      accidental = "^";
    }
    if (note.symbol.accidental === "b") {
      accidental = "_";
    }
    return symbol + accidental + modifiers;
  }
}

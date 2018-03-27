import * as _ from "lodash";
import { TabSection } from "./tab_section";
import { TabStaffSection } from "./tab_staff_section";
import { ChordChartSection } from "./chord_chart_section";
import { ChordDefinition } from "./chord_definition";
import { TabStaff } from "./tab_staff";
import { UnrecognizedSection } from "./unrecognized_section";
import { UnboundNote, UnboundChord, BoundChord, GuitarTuning, Interval } from "../music";

export interface ITuningGuess {
  tuning: GuitarTuning;
  confidence: number;
}

export class TabKnowledge {
  public static Default: TabKnowledge;

  public static infer(sections: TabSection[]): TabKnowledge {
    const tuningGuesses = _(sections).map((section) => {
      if (section instanceof TabStaffSection) {
        return this.tuningFromTabStrings(section.staff);
      }
      if ((section instanceof UnrecognizedSection) || (section instanceof ChordChartSection)) {
        return this.tuningFromText(section.source.contents);
      }
    }).compact().value();

    const tuningGuess: GuitarTuning = _(tuningGuesses).sortBy("confidence").map("tuning").last() || GuitarTuning.Standard;
    return new TabKnowledge(tuningGuess);
  }

  public static tuningFromTabStrings(staff: TabStaff): ITuningGuess {
    // Search for a couple well known tunings to short circuit the guesser
    switch (staff.tuningString().toUpperCase()) {
      case "E B G D A E":
        return {tuning: GuitarTuning.Standard, confidence: 0.6};
      case "E B G D A D":
        return {tuning: GuitarTuning.DropD, confidence: 0.6};
      case "G D A E":
        return {tuning: GuitarTuning.Bass, confidence: 0.6};
    }
    // Given a letter for each string in a staff, loop through and assign octaves to each letter by binding unbound notes
    const unboundNotes = staff.strings.map((tabString) => new UnboundNote(tabString.tuning));
    let octave = 2; // assume we're starting in the second octave, I sure hope this is never wrong :/
    let previousNote = unboundNotes[0];
    const boundNotes = unboundNotes.map((note, index) => {
      if (note.semitonesAboveC < previousNote.semitonesAboveC) {
        octave += 1;
      }
      previousNote = note;
      return note.bindAtOctave(octave);
    });

    return {tuning: new GuitarTuning(boundNotes), confidence: 0.5};
  }

  public static tuningFromText(text: string): ITuningGuess | undefined {
    const match = text.match(/(?:[^\w]|^)Capo (\d+)/i) || text.match(/(\d+) Capo(?:[^\w]|$)/i);
    if (match) {
      const capoInterval = new Interval(parseInt(match[1], 10));
      const boundNotes = GuitarTuning.Standard.stringRoots.map((note) => note.applyInterval(capoInterval));
      return {tuning: new GuitarTuning(boundNotes), confidence: 0.7};
    }
  }

  constructor(public tuning: GuitarTuning) {}

  public bindChord(chord: UnboundChord): BoundChord {
    // TODO: Implement definition lookup for chords
    return chord.bindAtRootOctave(3);
  }

  public bindDefinition(definition: ChordDefinition): BoundChord {
    return definition.bindAtTuning(this.tuning);
  }

}

TabKnowledge.Default = new TabKnowledge(GuitarTuning.Standard);

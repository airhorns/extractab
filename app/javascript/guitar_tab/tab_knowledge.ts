import * as _ from "lodash";
import { TabSection } from "./tab_section";
import { TabStaffSection } from "./tab_staff_section";
import { ChordChartSection } from "./chord_chart_section";
import { ChordDefinitionSection } from "./chord_definition_section";
import { ChordDefinition } from "./chord_definition";
import { TabStaff } from "./tab_staff";
import { UnrecognizedSection } from "./unrecognized_section";
import { UnboundNote, UnboundChord, UnboundChordKey, BoundChord, GuitarTuning, Interval, Intervals } from "../music";

export interface ITuningGuess {
  tuning: GuitarTuning;
  label?: string;
  confidence: number;
}

export interface IChordDefinitionLookup {
  [key: string]: ChordDefinition;
}

// Context storage for what we know about the tab and what the user has told us about the tab
// Operated on by the toolbar and reflected throughout all the sections.
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

    const tuningGuess = _(tuningGuesses).sortBy("confidence").last() || {tuning: GuitarTuning.Standard, label: ""};

    const definedChords = _(sections).map((section) => {
      if (section instanceof ChordDefinitionSection) {
        return section.definitionMaps.map((map) => map.definition);
      }
    }).compact().flatten().keyBy((definition) => definition.definedChord.key()).value();

    return new TabKnowledge(definedChords, tuningGuess.tuning, tuningGuess.label);
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

    const tuning = new GuitarTuning(boundNotes);
    const label = tuning.equivalent(GuitarTuning.Standard) ? "" : "found in tab";
    return {tuning, label, confidence: 0.5};
  }

  public static tuningFromText(text: string): ITuningGuess | undefined {
    const match = text.match(/(?:[^\w]|^)Capo (\d+)/i) || text.match(/(\d+) Capo(?:[^\w]|$)/i);
    if (match) {
      const capoFretNumber = parseInt(match[1], 10);
      const tuning = GuitarTuning.Standard.transpose(new Interval(capoFretNumber));
      return {tuning, label: `Capo ${capoFretNumber}`, confidence: 0.7};
    }
  }

  public tuningTranspose: Interval = Intervals.Zeroth;
  public originalTuningLabel: string;

  constructor(public definedChords: IChordDefinitionLookup, public tuning: GuitarTuning, public tuningLabel: string = "") {
    this.originalTuningLabel = tuningLabel;
  }

  public transposeTuning(semitones: number) {
    const newInterval = new Interval(this.tuningTranspose.semitones + semitones);
    const label = newInterval.semitones === 0 ? this.originalTuningLabel
      : `${this.originalTuningLabel} transpose ${newInterval.semitones > 0 ? "+" : ""}${newInterval.semitones}`.trim();

    return this.clone({
      tuningTranspose: newInterval,
      tuning: this.tuning.transpose(new Interval(semitones)),
      tuningLabel: label,
    });
  }

  public bindChord(chord: UnboundChord): BoundChord {
    // TODO: Implement definition lookup for chords
    return chord.bindAtRootOctave(3);
  }

  public bindDefinition(definition: ChordDefinition): BoundChord {
    return definition.bindAtTuning(this.tuning);
  }

  private clone(properties: Partial<TabKnowledge>) {
    const clone =  new TabKnowledge(
      properties.definedChords || this.definedChords,
      properties.tuning || this.tuning,
      properties.tuningLabel || this.tuningLabel,
    );
    clone.tuningTranspose = properties.tuningTranspose || this.tuningTranspose;
    clone.originalTuningLabel = properties.originalTuningLabel || this.originalTuningLabel;
    return clone;
  }
}

TabKnowledge.Default = new TabKnowledge({}, GuitarTuning.Standard);

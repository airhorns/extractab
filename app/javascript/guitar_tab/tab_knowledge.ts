import * as _ from "lodash";
import { TabSection } from "./tab_section";
import { TabStaffSection } from "./tab_staff_section";
import { ChordDefinition } from "./chord_definition";
import { UnrecognizedSection } from "./unrecognized_section";
import { UnboundChord, BoundChord, GuitarTuning } from "../music";

export class TabKnowledge {
  public static Default: TabKnowledge;

  public static infer(sections: TabSection[]): TabKnowledge {
    const tuningStringGuesses = _(sections).map((section) => {
      if (section instanceof TabStaffSection) {
        // TODO: Implement tabstaff tuning extraction
      }
      if (section instanceof UnrecognizedSection) {
        // TODO: Implement capo hint detection
      }
    }).compact().value();

    const tuningGuess: GuitarTuning = GuitarTuning.Standard;
    return new TabKnowledge(tuningGuess);
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

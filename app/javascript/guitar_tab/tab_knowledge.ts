import * as _ from "lodash";
import { TabSection } from "./tab_section";
import { TabStaffSection } from "./tab_staff_section";
import { UnrecognizedSection } from "./unrecognized_section";
import { GuitarTuning } from "../music";

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
}

TabKnowledge.Default = new TabKnowledge(GuitarTuning.Standard);

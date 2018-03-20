import * as ohm from "ohm-js";
import { UnboundNote, UnboundChord, ChordNames, ThirdNames, SeventhNames } from "../music";

const nameForThird = (triadModifier: ohm.Node): ThirdNames => {
  switch (triadModifier.source.contents) {
    case "min":
    case "m":
    case "-":
      return ThirdNames.Minor;
    case "maj":
    case "M":
    case "":
    case undefined:
      return ThirdNames.Major;
    default:
      throw new Error(`Unrecognized node modifier "${triadModifier.source.contents}"`);
  }
};

const nameForSeventh = (triadModifier: ohm.Node, extensionSeparator?: ohm.Node): SeventhNames => {
  if (extensionSeparator && extensionSeparator.source.contents === "add" || ["maj", "M"].includes(triadModifier.source.contents)) {
    return SeventhNames.Major;
  } else {
    return SeventhNames.Dominant;
  }
};

const sixthExtension = (third: ThirdNames): ChordNames => {
  if (third === ThirdNames.Major) {
    return ChordNames.MajorSixth;
  } else {
    return ChordNames.MinorSixth;
  }
};

const seventhExtension = (third: ThirdNames, seventh: SeventhNames): ChordNames => {
  if (third === ThirdNames.Major) {
    if (seventh === SeventhNames.Dominant) {
      return ChordNames.DominantSeventh;
    } else {
      return ChordNames.MajorSeventh;
    }
  } else {
    return ChordNames.MinorSeventh;
  }
};

const highExtension = (third: ThirdNames, seventh: SeventhNames, extensionString: string): ChordNames => {
  const extensionNumber = parseInt(extensionString, 10);
  switch (extensionNumber) {
    case 9:
      if (third === ThirdNames.Major) {
        if (seventh === SeventhNames.Dominant) {
          return ChordNames.Ninth;
        } else {
          return ChordNames.MajorNinth;
        }
      } else {
        return ChordNames.MinorNinth;
      }
    case 11:
      if (third === ThirdNames.Major) {
        if (seventh === SeventhNames.Dominant) {
          return ChordNames.Eleventh;
        } else {
          return ChordNames.MajorEleventh;
        }
      } else {
        return ChordNames.MinorEleventh;
      }
    case 13:
      if (third === ThirdNames.Major) {
        if (seventh === SeventhNames.Dominant) {
          return ChordNames.Thirteenth;
        } else {
          return ChordNames.MajorThirteenth;
        }
      } else {
        return ChordNames.MinorThirteenth;
      }
    default:
      throw new Error(`Can't process chord with extension "${extensionString}"`);
  }
};

export const addChordParsingOperations = (Semantics: ohm.Semantics) => {
  Semantics.addOperation("buildNote", {
    note(letter, accidental): UnboundNote {
      let noteString = letter.primitiveValue;
      if (accidental.children.length > 0) { noteString += accidental.children[0].primitiveValue; }
      return UnboundNote.fromString(noteString);
    },
  });

  Semantics.addOperation("buildChord", {
    chord(rootNoteNode, triadModifier, extensionSeparator, extension, sus, suspension, _, substituteRootNode): UnboundChord {
      const rootNote = rootNoteNode.buildNote();
      let substituteRoot: UnboundNote | undefined;
      const third = nameForThird(triadModifier);

      let fullChordName: ChordNames;

      if (substituteRootNode.source.contents) {
        // Node has one terminal node for the "/" character indicating a substituteRoot, and then a child node for the actual note characters
        substituteRoot = substituteRootNode.children[0].buildNote();
      }

      const extensionString = extension.children[0] ? extension.children[0].source.contents : "";

      if (extensionString === "") {
        fullChordName = third === ThirdNames.Major ? ChordNames.Major : ChordNames.Minor;
      } else {
        const seventh = nameForSeventh(triadModifier, extensionSeparator.children[0]);

        switch (extensionString) {
          case "6":
          fullChordName = sixthExtension(third);
          break;
          case "7":
          fullChordName = seventhExtension(third, seventh);
          break;
          case "9":
          case "11":
          case "13":
          fullChordName = highExtension(third, seventh, extensionString);
          break;
        default:
          throw new Error(`Can't process chord with extension "${extensionString}"`);
        }
      }

      return UnboundChord.forName(rootNote, fullChordName, substituteRoot, this.source.contents);
    },
  });
};

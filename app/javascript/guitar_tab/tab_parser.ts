import TabParseResult from "./tab_parse_result";
import { ITabSection } from "./i_tab_section";
import { UnrecognizedSection } from "./unrecognized_section";
import { ChordSection } from "./chord_section";
import { IFret, ChordDefinition } from "./chord_definition";
import { ChordDefinitionSection } from "./chord_definition_section";
import { addChordParsingOperations } from "./chord_parser";
import * as ohm from "ohm-js";

export const Grammar: ohm.Grammar = require("./grammar"); // tslint:disable-line
export const Semantics: ohm.Semantics = Grammar.createSemantics();

addChordParsingOperations(Semantics);

Semantics.addOperation("buildTab", {
  contentDelimitedSection(_, sectionHeader, __, selfDelimitedSectionContents, ___): ITabSection {
    return selfDelimitedSectionContents.buildTab();
  },
  lineDelimitedSection_header(_, sectionHeader, __, chording, ___): ITabSection {
    return chording.buildTab();
  },
  lineDelimitedSection_headerless(_, chording, __): ITabSection {
    return chording.buildTab();
  },
  unrecognizedSection_headerless(lines, _): ITabSection {
    return new UnrecognizedSection(lines.source);
  },
  selfDelimitedSectionContents(node): ITabSection {
    // Wrong!
    return node.buildTab();
  },
  chordDefinitionLines(line, lines): ITabSection {
    const definitions = [line.buildTab()].concat(lines.buildTab());
    return new ChordDefinitionSection(lines.source, definitions);
  },
  // chordDefinitionLines = ( spaceMaybe chord spaceMaybe (chordFretting | dashedChordFretting) spaceMaybe eol ) +
  chordDefinitionLine(_, chordNode, __, fretting, ___, ____): ChordDefinition {
    const chord = chordNode.buildChord();
    // Loop over the iteration node for the frets to get an IFret corresponding to the fret
    const frets: IFret[] = fretting.buildTab();
    return new ChordDefinition(chord, frets);
  },
  chordFretting(frets): IFret[] {
    return frets.children.map((child: ohm.Node) => {
      if (child.source.contents === "x") {
        return null;
      } else {
        return {fret: parseInt(child.source.contents, 10)};
      }
    });
  },
  dashedChordFretting(frets, _, lastFret): IFret[] {
    return frets.buildTab().concat([lastFret.buildTab()]);
  },
  dashedChordFret_null(_): IFret {
    return null;
  },
  dashedChordFret_digits(firstDigit, secondDigit): IFret {
    return {fret: parseInt(firstDigit.source.contents + secondDigit.source.contents, 10)};
  },
  chording(lines): ITabSection {
    return new ChordSection(lines.source);
  },
  tabLines(lines): ITabSection {
    // WRONG -- should be
    // return new TabSection(lines.source, lines.buildTab())
    lines.buildTab();
    return new UnrecognizedSection(lines.source);
  },
  tabStaffLine(_, tabStringTuning, __, hits, ___, ____) {
    return [tabStringTuning, hits.buildTab()];
  },
  tabRest(_) {
    return {};
  },
  tabHit(firstDigit, secondDigit, linkage) {
    return firstDigit.terminalValue;
  },
});

export class TabParser {
  public parse(str: string) {
    const matchResult = Grammar.match(str + "\n");
    let sections;
    if (matchResult.succeeded()) {
      sections = Semantics(matchResult).buildTab();
    }
    return new TabParseResult(matchResult, sections);
  }

  public parseChord(chordString: string) {
    const matchResult = Grammar.match(chordString, "chord");
    if (matchResult.succeeded()) {
      return Semantics(matchResult).buildChord();
    } else {
      throw new Error(matchResult.message);
    }
  }
}

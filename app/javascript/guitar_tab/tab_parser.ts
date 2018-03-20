import * as ohm from "ohm-js";
import * as _ from "lodash";
import { TabParseResult } from "./tab_parse_result";
import { ITabSection } from "./i_tab_section";
import { UnrecognizedSection } from "./unrecognized_section";
import { ChordSource, LyricLine, ChordChartSection } from "./chord_chart_section";
import { ChordDefinition } from "./chord_definition";
import { TabLinkage, TabHit } from "./tab_hit";
import { TabString } from "./tab_string";
import { TabStaff } from "./tab_staff";
import { TabStaffSection } from "./tab_staff_section";
import { IFret } from "./i_fret";
import { ChordDefinitionSection } from "./chord_definition_section";
import { addChordParsingOperations } from "./chord_parser";

export const Grammar: ohm.Grammar = require("./grammar"); // tslint:disable-line
export const Semantics: ohm.Semantics = Grammar.createSemantics();

addChordParsingOperations(Semantics);

Semantics.addOperation("buildTab", {
  contentDelimitedSection(__, sectionHeader, ___, selfDelimitedSectionContents, ____): ITabSection {
    return selfDelimitedSectionContents.buildTab();
  },
  lineDelimitedSection_header(__, sectionHeader, ___, chording, ____): ITabSection {
    return chording.buildTab();
  },
  lineDelimitedSection_headerless(__, chording, ___): ITabSection {
    return chording.buildTab();
  },
  unrecognizedSection_headerless(lines, __): ITabSection {
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
  chordDefinitionLine(__, chordNode, ___, fretting, ____, _____): ChordDefinition {
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
  dashedChordFretting(frets, __, lastFret): IFret[] {
    return frets.buildTab().concat([lastFret.buildTab()]);
  },
  dashedChordFret_null(__): IFret {
    return null;
  },
  dashedChordFret_digits(firstDigit, secondDigit): IFret {
    return {fret: parseInt(firstDigit.source.contents + secondDigit.source.contents, 10)};
  },
  tabStaffLines(lines): ITabSection {
    const staff = new TabStaff(lines.buildTab());
    return new TabStaffSection(lines.source, staff);
  },
  tabStaffLine(__, tabStringTuning, ___, hits, ____, _____) {
    return new TabString(tabStringTuning.source.contents, _.compact(hits.buildTab()));
  },
  tabRest(__) {
    return;
  },
  tabHit(hit, hits): TabHit {
    // The last three arguments are all IterationNodes for the individual tokens in the a
    const components = [hit.buildTab()].concat(hits.buildTab());
    return new TabHit(
      components.map((component) => ({fret: component.fret})),
      _.dropRightWhile(components.map((component) => component.linkage), (value) => !value),
      (ohm as any).util.getLineAndColumn(this.source.sourceString, this.source.startIdx).colNum - 1, // requires any cast because util isn't in the ts.d for ohm
    );
  },
  tabHitComponent(firstDigit, secondDigit, linkageNode) {
    let linkage: TabLinkage | undefined;
    switch (linkageNode.source.contents) {
      case "h":
      case "H":
      case "p":
      case "P":
      case "^":
        linkage = TabLinkage.Slur;
        break;
      case "/":
        linkage = TabLinkage.Slide;
        break;
      case "b":
      case "B":
        linkage = TabLinkage.Bend;
        break;
    }

    return {
      fret: parseInt(firstDigit.source.contents + secondDigit.source.contents, 10),
      linkage,
    };
  },
  chordChart(lines): ITabSection {
    const chartLines = lines.buildTab();
    return new ChordChartSection(this.source, chartLines);
  },
  chordChartChordLine(__, chordNodes, ___, repetitionIndicator, ____): ChordSource[] {
    return chordNodes.children.map((chordNode) => {
      return {
        chord: chordNode.buildChord(),
        source: chordNode.source,
      };
    });
  },
  chordChartLyricLine(chars, __): LyricLine {
    return {
      lyrics: chars.sourceString,
      source: chars.source,
    };
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

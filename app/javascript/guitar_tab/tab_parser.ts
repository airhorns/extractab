import * as ohm from "ohm-js";
import * as _ from "lodash";
import { TabParseResult } from "./tab_parse_result";
import { TabSection } from "./tab_section";
import { TabKnowledge } from "./tab_knowledge";
import { UnrecognizedSection } from "./unrecognized_section";
import { ChordSource, LyricLine, ChordChartSection } from "./chord_chart_section";
import { ChordDefinition, ChordDefinitionSourceMap } from "./chord_definition";
import { TabLinkage, TabHit } from "./tab_hit";
import { TabString } from "./tab_string";
import { TabStaff } from "./tab_staff";
import { TabStaffBarLines } from "./tab_staff_bar_lines";
import { TabStaffSection } from "./tab_staff_section";
import { IFret } from "./i_fret";
import { ChordDefinitionSection } from "./chord_definition_section";
import { addChordParsingOperations } from "./chord_parser";

export const Grammar: ohm.Grammar = require("./grammar"); // tslint:disable-line
export const Semantics: ohm.Semantics = Grammar.createSemantics();

addChordParsingOperations(Semantics);

Semantics.addOperation("buildTab", {
  contentDelimitedSection(__, sectionHeader, ___, selfDelimitedSectionContents, ____): TabSection {
    const section: TabSection = selfDelimitedSectionContents.buildTab();
    section.headerSource = sectionHeader.source;
    return section;
  },
  lineDelimitedSection_header(__, sectionHeader, ___, chording, ____): TabSection {
    const section: TabSection = chording.buildTab();
    section.headerSource = sectionHeader.source;
    return section;
  },
  lineDelimitedSection_headerless(__, chording, ___): TabSection {
    return chording.buildTab();
  },
  unrecognizedSection_header(sectionHeader, __, lines, ___): TabSection {
    const section = new UnrecognizedSection(lines.source);
    section.headerSource = sectionHeader.source;
    return section;
  },
  unrecognizedSection_headerless(lines, __): TabSection {
    return new UnrecognizedSection(lines.source);
  },
  chordDefinitionLines(line, lines): TabSection {
    const definitionMaps = [line.buildTab()].concat(lines.buildTab());
    return new ChordDefinitionSection(lines.source, definitionMaps);
  },
  // chordDefinitionLines = ( spaceMaybe chord spaceMaybe (chordFretting | dashedChordFretting) spaceMaybe eol ) +
  chordDefinitionLine(__, chordNode, ___, fretting, ____, _____): ChordDefinitionSourceMap {
    const chord = chordNode.buildChord();
    // Loop over the iteration node for the frets to get an IFret corresponding to the fret
    const frets: IFret[] = fretting.buildTab();
    const definition = new ChordDefinition(chord, frets);
    return new ChordDefinitionSourceMap(this.source, chordNode.source, definition);
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
  tabStaffLines(chordChart, lines): TabSection {
    const barLines = TabStaffBarLines.fromStaffLine(lines.children[0]);
    const staff = new TabStaff(lines.buildTab(), barLines);
    return new TabStaffSection(lines.source, staff);
  },
  tabStaffLine(__, tabStringTuning, ___, hits, ____, _____) {
    return new TabString(tabStringTuning.source.contents, _(hits.buildTab() as TabHit[][]).flatten().compact().value());
  },
  tabRest(__) {
    return;
  },
  tabHit(component, components): TabHit[] {
    return [component.buildTab()].concat(components.buildTab());
  },
  tabHitComponent(leadingLinkage, firstDigit, secondDigit, linkageNode): TabHit {
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

    return new TabHit(
      {fret: parseInt(firstDigit.source.contents + secondDigit.source.contents, 10)},
      ohm.util.getLineAndColumn(this.source.sourceString, this.source.startIdx).colNum - 1,
      linkage,
    );
  },
  chordChart(lines): TabSection {
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
    let knowledge;
    if (matchResult.succeeded()) {
      sections = Semantics(matchResult).buildTab();
      knowledge = TabKnowledge.infer(sections);
    }
    return new TabParseResult(matchResult, sections, knowledge as any);
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

import * as React from "react";
import * as _ from "lodash";
import { UnboundChord } from "../music";
import { ChordChartSection, TabKnowledge, ChordLine, ChordChartLine, isChordLine } from "../guitar_tab";
import { ChordDiagram } from "./chord_diagram";
import { SectionHeader } from "./section_header";
import { CodeMirrorRangeHighlight } from "./code_mirror_range_highlight";

interface IChordChartProps {
  section: ChordChartSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;

}

export class ChordChart extends React.Component<IChordChartProps, {}> {
  public render() {
    const chordDiagrams = _.chain(this.props.section.lines)
    .flatMap((line: ChordChartLine) => {
      if (isChordLine(line)) {
        return line.map((chordSource) => chordSource.chord);
      } else {
        return undefined;
      }
    })
    .map((a) => a as any as UnboundChord)
    .compact()
    .uniqWith((a, b) => a.equivalent(b))
    .map((chord: UnboundChord) => {
      const boundChord = this.props.tabKnowledge.bindChord(chord);
      return <ChordDiagram chord={boundChord} key={boundChord.notesString()} tabKnowledge={this.props.tabKnowledge} />;
    })
    .value();

    const chordMarks = _.chain(this.props.section.lines)
      .filter(isChordLine)
      .flatMap((line: ChordLine) => {
        return line.map((chordSource) => <CodeMirrorRangeHighlight
          key={chordSource.source.startIdx}
          codemirror={this.props.codemirror}
          interval={chordSource.source}
          className="cm-chord"
        />);
      })
      .value();

    return <React.Fragment>
      { this.props.section.headerSource && <SectionHeader section={this.props.section} codemirror={this.props.codemirror} tabKnowledge={this.props.tabKnowledge}/> }
      {chordDiagrams}
      {chordMarks}
    </React.Fragment>;
  }
}

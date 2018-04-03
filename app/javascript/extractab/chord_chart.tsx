import * as React from "react";
import * as _ from "lodash";
import * as EventEmitter from "eventemitter3";
import { UnboundChord } from "../music";
import { ChordChartSection, ChordSource, TabKnowledge, ChordLine, ChordChartLine, isChordLine } from "../guitar_tab";
import { HoverChordDiagram } from "./hover_chord_diagram";
import { SectionHeader } from "./section_header";
import { CodeMirrorRangeHighlight } from "./code_mirror_range_highlight";

interface IChordChartProps {
  section: ChordChartSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
  hoverEvents: EventEmitter;
}

export class ChordChart extends React.Component<IChordChartProps, {}> {
  public render() {
    const chordDiagrams = _.chain(this.props.section.lines)
    .flatMap((line: ChordChartLine) => { if (isChordLine(line)) { return line; }})
    .compact()
    .map((chordSource: ChordSource) => {
      const boundChord = this.props.tabKnowledge.bindChord(chordSource.chord);
      return <HoverChordDiagram
        chord={boundChord}
        key={chordSource.source.startIdx}
        codemirror={this.props.codemirror}
        hoverInterval={chordSource.source}
        hoverEvents={this.props.hoverEvents}
        tabKnowledge={this.props.tabKnowledge} />;
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
      { this.props.section.header && <SectionHeader section={this.props.section} codemirror={this.props.codemirror} tabKnowledge={this.props.tabKnowledge}/> }
      {chordDiagrams}
      {chordMarks}
    </React.Fragment>;
  }
}

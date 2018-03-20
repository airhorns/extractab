import * as React from "react";
import * as _ from "lodash";
import { UnboundChord } from "../music";
import { ChordChartSection, ChordLine, ChordChartLine, isChordLine } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";
import { ChordDiagram } from "./chord_diagram";

interface IChordChartWidgetProps extends IWidgetProps {
  section: ChordChartSection;
}

export class ChordChartWidget extends AbstractWidget<IChordChartWidgetProps, {}> {
  public render() {
    // const chordDiagrams = _.chain(this.props.section.lines)
    // .flatMap((line: ChordChartLine) => {
    //   if (isChordLine(line)) {
    //     return line.map((chordSource) => chordSource.chord);
    //   } else {
    //     return undefined;
    //   }
    // })
    // .map((a) => a as any as UnboundChord)
    // .compact()
    // .uniqWith((a, b) => a.equivalent(b))
    // .map((chord: UnboundChord) => <ChordDiagram chord={chord} key={chord.notesString()}/>)
    // .value();
    //
    // return <div ref={this.setWidgetElement}>
    //   <ul className="chord_diagrams">
    //     {chordDiagrams}
    //   </ul>
    // </div>;
    return <div/>;
  }
}

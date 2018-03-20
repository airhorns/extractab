import * as React from "react";
import { ChordDefinition, TabKnowledge } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";
import { PianoVisualization } from "./piano_visualization";

interface IChordDiagramProps extends IWidgetProps {
  tabKnowledge: TabKnowledge;
  chordDefinition: ChordDefinition;
  lineNumber: number;
}

export class ChordDiagram extends AbstractWidget<IChordDiagramProps, {}> {
  public render() {
    const chord = this.props.chordDefinition.bindAtTuning(this.props.tabKnowledge.tuning);
    return <div className="box" ref={this.setWidgetElement}>
      <p><b>{this.props.chordDefinition.definedChord.displayLabel()}</b>: {chord.notesString()}</p>;
      <PianoVisualization chord={chord} />
    </div>
  }
}

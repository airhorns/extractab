import * as React from "react";
import { BoundChord } from "../music";
import { ChordDefinition, TabKnowledge } from "../guitar_tab";
import { PianoVisualization } from "./piano_visualization";

interface IChordDiagramProps {
  tabKnowledge: TabKnowledge;
  chord: BoundChord;
}

// Renders a box explaining a chord with controls for revoicing it
export class ChordDiagram extends React.Component<IChordDiagramProps, {}> {
  public render() {
    return <div className="box">
      <p><b>{this.props.chord.displayLabel()}</b>: {this.props.chord.notesString()}</p>
      <PianoVisualization chord={this.props.chord} />
    </div>;
  }
}

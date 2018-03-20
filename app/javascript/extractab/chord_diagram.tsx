import * as React from "react";
import { UnboundChord } from "../music";

interface IChordDiagramProps {
  chord: UnboundChord;
}

export class ChordDiagram extends React.Component<IChordDiagramProps, {}> {
  public render() {
    return <div>
      <h3>Chord: {this.props.chord.notesString()}</h3>
    </div>;
  }
}

import * as React from "react";
import { ChordDefinition } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";

interface IChordDiagramProps extends IWidgetProps {
  chordDefinition: ChordDefinition;
  lineNumber: number;
}

export class ChordDiagram extends AbstractWidget<IChordDiagramProps, {}> {
  public render() {
    return <h3 ref={this.setWidgetElement}>
      DIAGRAM {this.props.chordDefinition.definedChord.displayLabel()}: {this.props.chordDefinition.definedChord.notesString()}
    </h3>;
  }
}

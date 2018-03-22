import * as React from "react";
import { BoundChord } from "../music";
import { ChordDefinition, TabKnowledge } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";
import { ChordDiagram } from "./chord_diagram";

interface IChordDiagramProps extends IWidgetProps {
  tabKnowledge: TabKnowledge;
  chord: BoundChord;
  lineNumber: number;
}

// Renders a box explaining a chord with controls for revoicing it and knows how to attach it to CodeMirror at a line number
export class ChordDiagramWidget extends AbstractWidget<IChordDiagramProps, {}> {
  public render() {
    return <div ref={this.setWidgetElement}>
      <ChordDiagram chord={this.props.chord} tabKnowledge={this.props.tabKnowledge} />
    </div>;
  }
}

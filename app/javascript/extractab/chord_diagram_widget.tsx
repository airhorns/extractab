import * as React from "react";
import { BoundChord } from "../music";
import { ChordDefinition, TabKnowledge } from "../guitar_tab";
import { CodeMirrorWidget, ICodeMirrorWidgetProps } from "./code_mirror_widget";
import { ChordDiagram } from "./chord_diagram";

interface IChordDiagramProps extends ICodeMirrorWidgetProps {
  tabKnowledge: TabKnowledge;
  chord: BoundChord;
  lineNumber: number;
}

// Renders a box explaining a chord with controls for revoicing it and knows how to attach it to CodeMirror at a line number
export class ChordDiagramWidget extends React.Component<IChordDiagramProps, {}> {
  public render() {
    return <CodeMirrorWidget codemirror={this.props.codemirror} lineNumber={this.props.lineNumber}>
    <div className="box">
      <ChordDiagram chord={this.props.chord} tabKnowledge={this.props.tabKnowledge} />
    </div>
  </CodeMirrorWidget>;
  }
}

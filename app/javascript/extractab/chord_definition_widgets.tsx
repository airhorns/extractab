import * as React from "react";
import * as CodeMirror from "codemirror";
import { ChordDefinitionSection, TabKnowledge } from "../guitar_tab";
import { ChordDiagram } from "./chord_diagram";

interface IChordDefinitionWidgetsProps {
  section: ChordDefinitionSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
}

export class ChordDefinitionWidgets extends React.Component<IChordDefinitionWidgetsProps, {}> {
  public render() {
    const diagrams = this.props.section.definitionMaps.map((definitionMap, index) => <ChordDiagram
      chordDefinition={definitionMap.definition}
      lineNumber={definitionMap.lineNumberForDisplay()}
      codemirror={this.props.codemirror}
      tabKnowledge={this.props.tabKnowledge}
      key={index}
    />);

    return <React.Fragment>
      {diagrams}
    </React.Fragment>;
  }
}

import * as React from "react";
import * as CodeMirror from "codemirror";
import { ChordDefinitionSection, TabKnowledge } from "../guitar_tab";
import { ChordDiagramWidget } from "./chord_diagram_widget";
import { SectionHeader } from "./section_header";
import { CodeMirrorRangeHighlight } from "./code_mirror_range_highlight";

interface IChordDefinitionWidgetsProps {
  section: ChordDefinitionSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
}

export class ChordDefinitionWidgets extends React.Component<IChordDefinitionWidgetsProps, {}> {
  public render() {
    const diagrams = this.props.section.definitionMaps.map((definitionMap, index) => <ChordDiagramWidget
      chord={this.props.tabKnowledge.bindDefinition(definitionMap.definition)}
      lineNumber={definitionMap.lineNumberForDisplay()}
      codemirror={this.props.codemirror}
      tabKnowledge={this.props.tabKnowledge}
      key={definitionMap.source.startIdx}
    />);

    const marks = this.props.section.definitionMaps.map((definitionMap, index) => <CodeMirrorRangeHighlight
      codemirror={this.props.codemirror}
      interval={definitionMap.chordSource}
      key={definitionMap.source.startIdx}
      className="cm-chord"
    />);

    return <React.Fragment>
      <SectionHeader section={this.props.section} codemirror={this.props.codemirror} tabKnowledge={this.props.tabKnowledge}/>
      {diagrams}
      {marks}
    </React.Fragment>;
  }
}

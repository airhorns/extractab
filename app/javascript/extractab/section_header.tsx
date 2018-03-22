import * as React from "react";
import * as CodeMirror from "codemirror";
import { TabSection, TabKnowledge } from "../guitar_tab";
import { CodeMirrorRangeHighlight } from "./codemirror_range_highlight";

interface ISectionHeaderProps {
  section: TabSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
}

export class SectionHeader extends React.Component<ISectionHeaderProps, {}> {
  public render() {
    if (this.props.section.headerSource) {
      return <CodeMirrorRangeHighlight codemirror={this.props.codemirror} interval={this.props.section.headerSource} className="cm-section-header" />;
    }
  }
}

import * as React from "react";
import * as CodeMirror from "codemirror";
import { TabSection, TabKnowledge } from "../guitar_tab";
import { CodeMirrorRangeHighlight } from "./code_mirror_range_highlight";

interface ISectionHeaderProps {
  section: TabSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
}

export class SectionHeader extends React.Component<ISectionHeaderProps, {}> {
  public render() {
    if (this.props.section.header) {
      return <CodeMirrorRangeHighlight codemirror={this.props.codemirror} interval={this.props.section.header.source} className="cm-section-header" />;
    } else {
      return <span/>;
    }
  }
}

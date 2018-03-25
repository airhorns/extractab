import * as React from "react";
import * as CodeMirror from "codemirror";
import { TabStaffSection, TabKnowledge } from "../guitar_tab";
import { TabStaffWidget } from "./tab_staff_widget";
import { SectionHeader } from "./section_header";

interface ITabStaffWidgetsProps {
  section: TabStaffSection;
  codemirror: CodeMirror.Editor;
  tabKnowledge: TabKnowledge;
}

export class TabStaffWidgets extends React.Component<ITabStaffWidgetsProps, {}> {
  public render() {
    return <React.Fragment>
      { this.props.section.header && <SectionHeader section={this.props.section} codemirror={this.props.codemirror} tabKnowledge={this.props.tabKnowledge}/> }
      <TabStaffWidget
        lineNumber={this.props.section.lineNumberForDisplay()}
        section={this.props.section}
        codemirror={this.props.codemirror}
        tabKnowledge={this.props.tabKnowledge} />
    </React.Fragment>;
  }
}

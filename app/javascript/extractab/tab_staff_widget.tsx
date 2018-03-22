import * as React from "react";
import { TabStaffSection, TabKnowledge } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";

interface ITabStaffWidgetProps extends IWidgetProps {
  section: TabStaffSection;
  tabKnowledge: TabKnowledge;
}

export class TabStaffWidget extends AbstractWidget<ITabStaffWidgetProps, {}> {
  public render() {
    return <div ref={this.setWidgetElement}><p>Fancy musical staff</p></div>;
  }
}

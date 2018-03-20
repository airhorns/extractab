import * as React from "react";
import { TabStaffSection } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";

interface ITabStaffWidgetProps extends IWidgetProps {
  section: TabStaffSection;
}

export class TabStaffWidget extends AbstractWidget<ITabStaffWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

import * as React from "react";
import { TabStaffSection } from "../guitar_tab";
import { AbstractSectionWidget, ISectionWidgetProps } from "./abstract_section_widget";

interface ITabStaffWidgetProps extends ISectionWidgetProps {
  section: TabStaffSection;
}

export class TabStaffWidget extends AbstractSectionWidget<ITabStaffWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

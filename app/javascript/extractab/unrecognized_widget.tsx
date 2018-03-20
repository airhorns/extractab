import * as React from "react";
import { UnrecognizedSection } from "../guitar_tab";
import { AbstractSectionWidget, ISectionWidgetProps } from "./abstract_section_widget";

interface IUnrecognizedWidgetProps extends ISectionWidgetProps {
  section: UnrecognizedSection;
}

export class UnrecognizedWidget extends AbstractSectionWidget<IUnrecognizedWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

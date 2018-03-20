import * as React from "react";
import { UnrecognizedSection } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";

interface IUnrecognizedWidgetProps extends IWidgetProps {
  section: UnrecognizedSection;
}

export class UnrecognizedWidget extends AbstractWidget<IUnrecognizedWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

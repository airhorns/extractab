import * as React from "react";
import { UnrecognizedSection } from "../guitar_tab";

interface IUnrecognizedWidgetProps {
  section: UnrecognizedSection;
}

export class UnrecognizedWidget extends React.Component<IUnrecognizedWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

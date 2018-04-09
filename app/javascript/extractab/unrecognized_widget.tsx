import * as React from "react";
import { UnrecognizedSection } from "../guitar_tab";
import { ICodeMirrorWidgetProps } from "./code_mirror_widget";

interface IUnrecognizedWidgetProps extends ICodeMirrorWidgetProps {
  section: UnrecognizedSection;
}

export class UnrecognizedWidget extends React.Component<IUnrecognizedWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

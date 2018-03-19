import * as React from "react";
import { ITabSectionProps } from "./i_tab_section_props";

export class UnrecognizedSectionWidget extends React.Component<ITabSectionProps, {}> {
  public render() {
    return <p>Line {this.props.line}: Unrecognized</p>;
  }
}

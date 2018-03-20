import * as React from "react";
import { ChordDefinitionSection } from "../guitar_tab";

interface IChordDefinitionWidgetProps {
  section: ChordDefinitionSection;
}

export class ChordDefinitionWidget extends React.Component<IChordDefinitionWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

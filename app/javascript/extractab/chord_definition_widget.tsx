import * as React from "react";
import { ChordDefinitionSection } from "../guitar_tab";
import { AbstractSectionWidget, ISectionWidgetProps } from "./abstract_section_widget";

interface IChordDefinitionWidgetProps extends ISectionWidgetProps {
  section: ChordDefinitionSection;
}

export class ChordDefinitionWidget extends AbstractSectionWidget<IChordDefinitionWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

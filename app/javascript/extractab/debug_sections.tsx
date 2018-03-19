import * as React from "react";
import { ITabSection } from "../guitar_tab";
import { UnrecognizedSectionWidget } from "./unrecognized_section_widget";

interface IDebugSectionProps {
  sections: ITabSection[];
}

export class DebugSections extends React.Component<IDebugSectionProps, {}> {
  constructor(props: IDebugSectionProps) {
    super(props);
  }

  public render() {
    const sections = this.props.sections.map((section) => {
      return <section key={section.source.startIdx}>
        <h3>{section.constructor.name}</h3>
        <p>{section.source.contents}</p>
      </section>;
    });
    return <div className="debug_sections">
      <h2>Debug</h2>
      {sections}
    </div>;
  }
}

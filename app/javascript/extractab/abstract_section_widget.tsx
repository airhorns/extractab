import * as React from "react";
import * as CodeMirror from "codemirror";
import { TabSection } from "../guitar_tab";

export interface ISectionWidgetProps {
  codemirror: CodeMirror.Editor;
  section: TabSection;
}

export abstract class AbstractSectionWidget<T extends ISectionWidgetProps, S> extends React.Component<T, S> {
  private widget: CodeMirror.LineWidget;
  private widgetElement: HTMLElement;

  // Ref'd by the renders of subclasses
  protected setWidgetElement = (element: HTMLElement | null) => {
    if (element) {
      this.widgetElement = element;
      const line = this.props.section.lineNumberForDisplay();
      this.widget = this.props.codemirror.addLineWidget(line, this.widgetElement);
    } else {
      if (this.widget) {
        this.widget.clear();
      }
    }
  }
}

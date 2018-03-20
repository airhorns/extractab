import * as React from "react";
import * as CodeMirror from "codemirror";

export interface IWidgetProps {
  codemirror: CodeMirror.Editor;
  lineNumber: number;
}

export abstract class AbstractWidget<T extends IWidgetProps, S> extends React.Component<T, S> {
  private widget: CodeMirror.LineWidget;
  private widgetElement: HTMLElement;

  // Ref'd by the renders of subclasses
  protected setWidgetElement = (element: HTMLElement | null) => {
    if (element) {
      this.widgetElement = element;
      const line = this.props.lineNumber;
      const unmanagedElement = this.widgetElement.cloneNode(true) as HTMLElement;
      console.log(`Adding line widget ${this.constructor} to ${line}`, unmanagedElement);
      this.widget = this.props.codemirror.addLineWidget(line, unmanagedElement);
    } else {
      if (this.widget) {
        this.widget.clear();
      }
    }
  }
}

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
      this.widget = this.props.codemirror.addLineWidget(line, unmanagedElement);
      this.widgetElement.style.display = "none";
    } else {
      if (this.widget) {
        this.widget.clear();
      }
    }
  }
}

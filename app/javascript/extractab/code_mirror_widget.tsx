import * as React from "react";
import * as ReactDOM from "react-dom";
import * as CodeMirror from "codemirror";
import { DomainAwarePureComponent } from "./util";

export interface ICodeMirrorWidgetProps {
  codemirror: CodeMirror.Editor;
  lineNumber: number;
}

export class CodeMirrorWidget extends React.Component<ICodeMirrorWidgetProps, {}> {
  private widget: CodeMirror.LineWidget | undefined;
  private widgetElement: HTMLElement;

  constructor(props: ICodeMirrorWidgetProps) {
    super(props);
    this.widgetElement = document.createElement("div");
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.widgetElement);
  }

  public componentDidMount() {
    this.widget = this.props.codemirror.addLineWidget(this.props.lineNumber, this.widgetElement);
  }

  public componentWillUnmount() {
    if (this.widget) { this.widget.clear(); }
    this.widget = undefined;
  }
}

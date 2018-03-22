import * as React from "react";
import * as CodeMirror from "codemirror";
import * as ohm from "ohm-js";
import * as util from "./util";

interface IRangeHighlightProps {
  interval: ohm.Interval;
  codemirror: CodeMirror.Editor;
  className: string;
}

export class CodeMirrorRangeHighlight extends React.Component<IRangeHighlightProps, {}> {
  protected textMarker: CodeMirror.TextMarker;

  public componentDidMount() {
    const range = util.intervalToCodemirrorMark(this.props.interval);
    this.textMarker = this.props.codemirror.getDoc().markText(range[0], range[1],   {
      className: this.props.className,
    });
  }

  public componentWillUnmount() {
    if (this.textMarker) {
      this.textMarker.clear();
    }
  }

  public render() {
    return <span id={"range-highlight-" + this.props.interval.startIdx + "-" + this.props.interval.endIdx} />;
  }
}

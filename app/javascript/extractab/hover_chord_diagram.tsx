import * as React from "react";
import * as EventEmitter from "eventemitter3";
import * as ohm from "ohm-js";
import { intervalToCodemirrorMark } from "./util";
import { BoundChord } from "../music";
import { ChordDefinition, TabKnowledge } from "../guitar_tab";
import { ChordDiagram } from "./chord_diagram";

interface IHoverChordDiagramProps {
  tabKnowledge: TabKnowledge;
  chord: BoundChord;
  hoverInterval: ohm.Interval;
  hoverEvents: EventEmitter;
  codemirror: CodeMirror.Editor;
}

interface IHoverChordDiagramState {
  visible: boolean;
}

// Renders a box explaining a chord with controls for revoicing it
export class HoverChordDiagram extends React.Component<IHoverChordDiagramProps, IHoverChordDiagramState> {
  private mark: [{line: number, ch: number}, {line: number, ch: number}];

  constructor(props: IHoverChordDiagramProps) {
    super(props);
    this.state = {visible: false};
    if (this.props.chord.displayLabel() === "F#133") {
      this.state = {visible: true};
    }
    this.mark = intervalToCodemirrorMark(this.props.hoverInterval);
    this.hoverListener = this.hoverListener.bind(this);
  }

  public componentDidMount() {
    this.props.hoverEvents.on("hover", this.hoverListener);
  }

  public componentWillUnmount() {
    this.props.hoverEvents.removeListener("hover", this.hoverListener);
  }

  public render() {
    if (this.state.visible) {
      const {top, left} = this.props.codemirror.charCoords(this.mark[0], "local");
      return <div className="box hover-widget" style={{top: top + 80, left: left + 80}}>
        <ChordDiagram chord={this.props.chord} tabKnowledge={this.props.tabKnowledge} />
      </div>;
    } else {
      return null;
    }
  }

  private hoverListener(event: {line: number, ch: number, xRel: number, sticky: string}) {
    // ohm intervals are 0 indexed
    let afterStart = false;
    let beforeEnd = false;
    if (event.line === this.mark[0].line) {
      // we're on the start line, make sure the character hovered is after the start
      if (event.ch >= this.mark[0].ch) {
        afterStart = true;
      }
    } else {
      if (event.line > this.mark[0].line) {
        afterStart = true;
      }
    }

    if (event.line === this.mark[1].line) {
      // we're on the end line, make sure the character hovered is before the end
      if (event.ch < this.mark[1].ch) {
        beforeEnd = true;
      }

      // If it's the last character, make sure that the xRel isn't too high (which it goes when you hover over characters that aren't in the source but off to the right)
      if (event.ch === this.mark[1].ch && event.xRel < 5) {
        beforeEnd = true;
      }
    } else {
      if (event.line < this.mark[1].line) {
        beforeEnd = true;
      }
    }

    if (afterStart && beforeEnd) {
      if (!this.state.visible) { this.setState({visible: true}); }
    } else {
      if (this.state.visible) { this.setState({visible: false}); }
    }
  }
}

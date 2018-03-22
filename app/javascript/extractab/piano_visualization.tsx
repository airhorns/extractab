import * as React from "react";
import * as _ from "lodash";
import { UnboundNote, BoundChord } from "../music";

export interface IPianoVisualizationProps {
  chord: BoundChord;
  showNoteLabels?: boolean;
  whiteKeyWidth?: number;
  whiteKeyHeight?: number;
  blackKeyWidth?: number;
  blackKeyHeight?: number;
  blackKeyOffset?: number;
}

export class PianoVisualization extends React.Component<IPianoVisualizationProps, {}> {
  public static defaultProps: Partial<IPianoVisualizationProps> = {
      showNoteLabels: true,
      whiteKeyWidth: 20,
      whiteKeyHeight: 80,
      blackKeyWidth: 16,
      blackKeyHeight: 50,
      blackKeyOffset: 12,
  };

  public static KeysMap: Array<[string, UnboundNote, number]> = [
    ["white", UnboundNote.fromString("C"), 0],
    ["white", UnboundNote.fromString("D"), 1],
    ["white", UnboundNote.fromString("E"), 2],
    ["white", UnboundNote.fromString("F"), 3],
    ["white", UnboundNote.fromString("G"), 4],
    ["white", UnboundNote.fromString("A"), 5],
    ["white", UnboundNote.fromString("B"), 6],
    ["black", UnboundNote.fromString("C#"), 0],
    ["black", UnboundNote.fromString("D#"), 1],
    ["black", UnboundNote.fromString("F#"), 3],
    ["black", UnboundNote.fromString("G#"), 4],
    ["black", UnboundNote.fromString("A#"), 5],
  ];

  public render() {
    const activeNotes = new Set(this.props.chord.notes().map((note) => note.sharpEquivalent().symbol.toString()));
    const octaves = this.props.chord.notes().map((note) => note.octave);
    const startOctave = _.min(octaves) || 3;
    const octaveWidth = this.props.whiteKeyWidth! * 7;
    const pianoNodes = _.range(startOctave, (_.max(octaves) || 4) + 1).reduce((nodes: JSX.Element[], octave, octaveOffset) => {
      PianoVisualization.KeysMap.forEach(([keyClassName, note, keyOffset]) => {
        const noteString = (note.symbol + octave);
        const active = activeNotes.has(noteString);
        const className = keyClassName + " " + noteString + (active ? " active" : "");
        if (className.includes("white")) {
          nodes.push(<rect
            className={className}
            key={noteString}
            width={this.props.whiteKeyWidth}
            height={this.props.whiteKeyHeight}
            x={(octaveOffset * octaveWidth) + (this.props.whiteKeyWidth! * keyOffset)}
            y="0"
          />);
          if (note.symbol === "C") {
            nodes.push(<text
              className="octave-label"
              textAnchor="middle"
              key={"label-" + noteString}
              x={(octaveOffset * octaveWidth) + (this.props.whiteKeyWidth! * keyOffset) + (this.props.whiteKeyWidth! / 2)}
              y={this.props.whiteKeyHeight! - 4}
            >
              {noteString}
            </text>);
          }
        } else {
          nodes.push(<rect
            className={className}
            key={noteString}
            width={this.props.blackKeyWidth}
            height={this.props.blackKeyHeight}
            x={(octaveOffset * octaveWidth) + (this.props.whiteKeyWidth! * keyOffset) + this.props.blackKeyOffset!  }
            y="0"
          />);
        }
      });
      return nodes;
    }, []);

    return <svg className="piano"><g>{pianoNodes}</g></svg>;
  }
}

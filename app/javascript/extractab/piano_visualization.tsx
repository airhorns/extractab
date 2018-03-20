import * as React from "react";
import { BoundChord } from "../music";

export interface IPianoVisualizationProps {
  chord: BoundChord;
  showNoteLabels?: boolean;
}

export class PianoVisualization extends React.Component<IPianoVisualizationProps, {}> {
  public static defaultProps: Partial<IPianoVisualizationProps> = {
      showNoteLabels: true
  };

  public render() {
    return <svg>
      <rect className="white c" width="20" height="80" x="${this.getCurrentX(0)}" y="0" />
      <rect className="white d" width="20" height="80" x="${this.getCurrentX(20)}" y="0" />
      <rect className="white e" width="20" height="80" x="${this.getCurrentX(40)}" y="0" />
      <rect className="white f" width="20" height="80" x="${this.getCurrentX(60)}" y="0" />
      <rect className="white g" width="20" height="80" x="${this.getCurrentX(80)}" y="0" />
      <rect className="white a" width="20" height="80" x="${this.getCurrentX(100)}" y="0" />
      <rect className="white b" width="20" height="80" x="${this.getCurrentX(120)}" y="0" />
      <rect className="black cs" width="16" height="50" x="${this.getCurrentX(12)}" y="0" />
      <rect className="black ds" width="16" height="50" x="${this.getCurrentX(32)}" y="0" />
      <rect className="black fs" width="16" height="50" x="${this.getCurrentX(72)}" y="0" />
      <rect className="black gs" width="16" height="50" x="${this.getCurrentX(92)}" y="0" />
      <rect className="black as" width="16" height="50" x="${this.getCurrentX(112)}" y="0" />
    </svg>
  }
}

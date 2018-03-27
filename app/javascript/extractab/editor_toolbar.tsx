import * as React from "react";
import { TabKnowledge } from "../guitar_tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faCaretSquareDown } from "@fortawesome/fontawesome-free-solid";

interface IToolbarProps {
  tabKnowledge: TabKnowledge;
  updateKnowledge: (newKnowledge: TabKnowledge) => void;
}

export class EditorToolbar extends React.Component<IToolbarProps, {}> {
  public render() {
    return <section id="toolbar">
      <div className="level">
        <div className="level-item">
          <p className="subtitle is-5">
            Tuning: <strong>{this.props.tabKnowledge.tuning.tuningString()}</strong>
            {this.props.tabKnowledge.tuningLabel && `(${this.props.tabKnowledge.tuningLabel})`}
          </p>
          <a className="button" onClick={(e) => this.transposeTuning(1)}>
            <FontAwesomeIcon icon={faCaretSquareUp}/>
            +1 ST
          </a>
          <a className="button" onClick={(e) => this.transposeTuning(-1)}>
            <FontAwesomeIcon icon={faCaretSquareDown}/>
            -1 ST
          </a>
        </div>
      </div>
    </section>;
  }

  private transposeTuning(semitones: number) {
    this.props.updateKnowledge(this.props.tabKnowledge.transposeTuning(semitones));
  }
}

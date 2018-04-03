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
          <div className="field has-addons">
            <p className="control subtitle is-5">
              <a className="button is-static">
                Tuning: <strong>{this.props.tabKnowledge.tuning.tuningString()}</strong>
                {this.props.tabKnowledge.tuningLabel && `(${this.props.tabKnowledge.tuningLabel})`}
              </a>
            </p>
            {/* <p className="control">
              <a className="button" onClick={(e) => this.transposeTuning(1)}>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faCaretSquareUp}/>
                </span>
                <span>+1 ST</span>
              </a>
            </p>
            <p className="control">
              <a className="button" onClick={(e) => this.transposeTuning(-1)}>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faCaretSquareDown}/>
                </span>
                <span>-1 ST</span>
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </section>;
  }

  // private transposeTuning(semitones: number) {
  //   this.props.updateKnowledge(this.props.tabKnowledge.transposeTuning(semitones));
  // }
}

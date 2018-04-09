/// <reference path="./abcjs.d.ts"/>

import * as React from "react";
import "font-awesome/css/font-awesome.min.css";
import "abcjs/abcjs-midi.css";
import * as abcjs from "abcjs/midi";
import { TabStaffSection, TabKnowledge, AbcConverter } from "../guitar_tab";
import { CodeMirrorWidget, ICodeMirrorWidgetProps } from "./code_mirror_widget";
import { domainObjectAwareShallowEqual } from "./util";

interface ITabStaffWidgetProps extends ICodeMirrorWidgetProps {
  section: TabStaffSection;
  tabKnowledge: TabKnowledge;
}

export class TabStaffWidget extends React.Component<ITabStaffWidgetProps, {}> {
  private abcContainer: HTMLElement | undefined;

  public renderAbc() {
    if (!this.abcContainer) {
      return;
    }
    if (this.props.section.staff.strings.length !== this.props.tabKnowledge.tuning.stringRoots.length) {
      return;
    }
    let downloadLabel: string;
    let title: string | undefined;
    if (this.props.section.header) {
      title = this.props.section.header.name;
      downloadLabel = "Download [%T] MIDI";
    } else {
      downloadLabel = "Download MIDI";
    }
    const abcString = new AbcConverter(this.props.tabKnowledge.tuning).toABC(this.props.section.staff, title);
    abcjs.renderAbc(this.abcContainer.childNodes[0] as HTMLElement, abcString, { add_classes: true });
    abcjs.renderMidi(this.abcContainer.childNodes[1] as HTMLElement, abcString, { generateDownload: true, downloadLabel, qpm: 120});
  }

  public render() {
    return <CodeMirrorWidget codemirror={this.props.codemirror} lineNumber={this.props.lineNumber}>
      <div className="box">
        <div className="abc-container" ref={(e) => { if (e) { this.abcContainer = e}}}>
          <div className="abc-music" />
          <div className="abc-midi" />
        </div>
      </div>
    </CodeMirrorWidget>;
  }

  public componentDidMount() {
    this.renderAbc();
  }

  public componentDidUpdate() {
    this.renderAbc();
  }
}

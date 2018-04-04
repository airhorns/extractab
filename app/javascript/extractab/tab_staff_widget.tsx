/// <reference path="./abcjs.d.ts"/>

import * as React from "react";
import "font-awesome/css/font-awesome.min.css";
import "abcjs/abcjs-midi.css";
import * as abcjs from "abcjs/midi";
import { TabStaffSection, TabKnowledge, AbcConverter } from "../guitar_tab";
import { PureAbstractWidget, AbstractWidget, IWidgetProps } from "./abstract_widget";
import { domainObjectAwareShallowEqual } from "./util";

interface ITabStaffWidgetProps extends IWidgetProps {
  section: TabStaffSection;
  tabKnowledge: TabKnowledge;
}

export class TabStaffWidget extends PureAbstractWidget<ITabStaffWidgetProps, {}> {
  public renderAbc(element: HTMLElement) {
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
    abcjs.renderAbc(element.childNodes[0] as HTMLElement, abcString, { add_classes: true });
    abcjs.renderMidi(element.childNodes[1] as HTMLElement, abcString, { generateDownload: true, downloadLabel, qpm: 120});
  }

  public render() {
    return <div className="box" ref={this.setWidgetElement}>
      <div className="abc-container" ref={(e) => e && this.renderAbc(e) }>
        <div className="abc-music" />
        <div className="abc-midi" />
      </div>
    </div>;
  }
}

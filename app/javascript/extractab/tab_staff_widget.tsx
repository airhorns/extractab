/// <reference path="./abcjs.d.ts"/>

import * as React from "react";
import "font-awesome/css/font-awesome.min.css";
import "abcjs/abcjs-midi.css";
import * as abcjs from "abcjs";
import { TabStaffSection, TabKnowledge, AbcConverter } from "../guitar_tab";
import { AbstractWidget, IWidgetProps } from "./abstract_widget";

interface ITabStaffWidgetProps extends IWidgetProps {
  section: TabStaffSection;
  tabKnowledge: TabKnowledge;
}

export class TabStaffWidget extends AbstractWidget<ITabStaffWidgetProps, {}> {
  public renderAbc(element: HTMLElement) {
    if (this.props.section.staff.strings.length !== this.props.tabKnowledge.tuning.stringRoots.length) {
      return;
    }
    const abcString = new AbcConverter(this.props.tabKnowledge.tuning).toABC(this.props.section.staff);
    abcjs.renderAbc(element, abcString);
  }

  public render() {
    return <div className="box" ref={this.setWidgetElement}>
      <div className="abc-container" ref={(e) => e && this.renderAbc(e) }/>
    </div>;
  }
}

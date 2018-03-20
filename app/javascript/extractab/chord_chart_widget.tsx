import * as React from "react";
import { ChordChartSection } from "../guitar_tab";

interface IChordChartWidgetProps {
  section: ChordChartSection;
}

export class ChordChartWidget extends React.Component<IChordChartWidgetProps, {}> {
  public render() {
    return <div/>;
  }
}

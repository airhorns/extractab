import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Renders a box explaining a chord with controls for revoicing it
export class LoadingEditorIndicator extends React.Component<{}, {}> {
  public render() {
    return <div className="loading-indicator">
      <a className="button is-loading">Loading</a>
    </div>;
  }
}

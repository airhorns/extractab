import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";

export default () => {
  ReactDOM.render(<App/>, document.getElementById("app_container"));
};

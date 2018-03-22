import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";

export const Boot = () => {
  ReactDOM.render(<App/>, document.getElementById("app_container"));
};

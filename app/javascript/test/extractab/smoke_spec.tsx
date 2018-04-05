import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../../extractab/app";

describe("Extractab", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});

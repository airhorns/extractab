import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";
import Fixtures from "../guitar_tab/fixtures";
import { Editor } from "../../extractab/editor";
import { EditorToolbar } from "../../extractab/editor_toolbar";

describe("Editor", () => {
  it("renders an editor and a toolbar given a start value", () => {
    const wrapper = mount(<Editor startValue={Fixtures.crossfire}/>);
    expect(wrapper.find(EditorToolbar)).toBeTruthy();
  });
});

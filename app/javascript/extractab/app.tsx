import * as React from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { Footer } from "./footer";
import Fixtures from "../test/guitar_tab/fixtures";
import "./app.scss";

export class App extends React.Component<{}, {}> {
  public render() {
      return <React.Fragment>
        <Header/>
        <Editor startValue={Fixtures.crossfire} debugEnabled={true}/>
        <Footer/>
      </React.Fragment>;
  }
}

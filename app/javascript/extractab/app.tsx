import * as React from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { Footer } from "./footer";
import Fixtures from "../test/guitar_tab/fixtures";
import "./app.scss";

const Tutorial = `
Welcome to Extractab!

Paste a guitar tab in here and Extractab will make it easier to play on other instruments! You'll get piano chord diagrams for chords:

A6    xx767x
Amaj7    5x665x
Bm7    797777

And you'll get sheet music and MIDI for tablature:

E|------|----7--7----------7-7-------|-----7--7----------4-------|
B|------|----7--7----------7-7-------|-----7--7----------5-------|
G|------|----7--7----------7-7-------|-----7--7----------4-------|
D|------|----7--7----------7-7-------|-----7--7----------6-------|
A|------|---9------------9-----------|---9-------5/7-4-4-4-------|
E|-5/6/-|-7--------5/6/7--------5/6/-|-7---------------4-4--5/6/-|

Good luck making beautiful music!
`;
export class App extends React.Component<{}, {}> {
  public render() {
      return <React.Fragment>
        <Header/>
        <Editor startValue={Tutorial} debugEnabled={true}/>
        <Footer/>
      </React.Fragment>;
  }
}

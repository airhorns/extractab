import * as React from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { DebugEditor } from "./debug_editor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      return <Router>
          <React.Fragment>
            <Header/>
            <Switch>
              <Route exact path="/" render={() => <Editor startValue={Fixtures.crossfire}/>} />
              <Route exact path="/t/:id" render={({match}) => <Editor TabHandle={match.params.id}/>} />
              <Route path="/debug" render={() => <DebugEditor startValue={Fixtures.fallingInLove}/>} />
            </Switch>
            <Footer/>
          </React.Fragment>
      </Router>;
  }
}

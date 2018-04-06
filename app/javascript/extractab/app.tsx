import * as React from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { DebugEditor } from "./debug_editor";
import { NotFound } from "./not_found";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./footer";
import "./app.scss";

const Tutorial = `
Welcome to Extractab!

Paste a guitar tab in here and Extractab will make it easier to play on other instruments! You'll get piano chord diagrams for chords:

A6    xx767x
Amaj7    5x665x
Bm7    797777

You'll get sheet music and MIDI for tablature:

E|------|----7--7----------7-7-------|-----7--7----------4-------|
B|------|----7--7----------7-7-------|-----7--7----------5-------|
G|------|----7--7----------7-7-------|-----7--7----------4-------|
D|------|----7--7----------7-7-------|-----7--7----------6-------|
A|------|---9------------9-----------|---9-------5/7-4-4-4-------|
E|-5/6/-|-7--------5/6/7--------5/6/-|-7---------------4-4--5/6/-|

And for chord & lyric sections, you can hover over the chords to get chord diagrams as well:

D             (C)        G
In the town where I was born
(Em)      Am         (C)       D
Lived a man who sailed to sea
(G)       D      (C)     G
And he told us of his life
(Em)    Am      (C)     D
In the land of submarines


Good luck making beautiful music!
`;
export class App extends React.Component<{}, {}> {
  public render() {
      return <Router>
          <React.Fragment>
            <Header/>
            <Switch>
              <Route exact path="/" render={() => <Editor startValue={Tutorial}/>} />
              <Route exact path="/t/:id" render={({match}) => <Editor tabHandle={match.params.id}/>} />
              <Route path="/debug" render={() => <DebugEditor/>} />
              <Route component={NotFound} />
            </Switch>
            <Footer/>
          </React.Fragment>
      </Router>;
  }
}

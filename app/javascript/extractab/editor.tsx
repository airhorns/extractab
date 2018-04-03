/// <reference path="./codemirror-extension"/>
import * as React from "react";
import * as CodeMirror from "codemirror";
import * as _ from "lodash";
import * as EventEmitter from "eventemitter3";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/elegant.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import { TabParser, TabSection, TabKnowledge, ChordDefinitionSection, ChordChartSection, TabStaffSection, UnrecognizedSection } from "../guitar_tab";
import { UnrecognizedWidget } from "./unrecognized_widget";
import { ChordChart } from "./chord_chart";
import { ChordDefinitionWidgets } from "./chord_definition_widgets";
import { TabStaffWidgets } from "./tab_staff_widgets";
import { EditorToolbar } from "./editor_toolbar";
import { LoadingEditorIndicator } from "./loading_editor_indicator";
import "./codemirror_guitar_tab_mode";

interface IEditorProps {
  startValue?: string;
  tabId?: string;
}

interface IEditorState {
  enabled: boolean;
  value: string;
  sections: TabSection[];
  tabKnowledge: TabKnowledge;
}

export class Editor extends React.Component<IEditorProps, IEditorState> {
  public codeMirrorInstance: CodeMirror.Editor;
  public parser: TabParser;
  private ownedOperationId?: number;
  private hoverEvents: EventEmitter;

  constructor(props: IEditorProps) {
    super(props);
    const newState = {
      enabled: false,
      value: "\n\n\n\n\n\n\n\n",
      sections: [],
      tabKnowledge: TabKnowledge.Default,
    };
    this.parser = new TabParser();
    this.hoverEvents = new EventEmitter();
    this.parseEditorContents = _.debounce(this.parseEditorContents, 100);
    this.throttledEmitHoverEvent = _.throttle(this.throttledEmitHoverEvent, 50);
    if (this.props.startValue !== undefined && this.props.startValue !== "") {
      newState.enabled = true;
      newState.value = this.props.startValue;
    }
    this.state = newState;
  }

  public parseEditorContents() {
    const parseResult = this.parser.parse(this.state.value);
    if (parseResult.succeeded) {
      this.setState({sections: parseResult.sections, tabKnowledge: parseResult.knowledge});
    }
  }

  // Called directly and often, so use a throttled inbetween that might actually do DOM work
  public handleHover = (e: React.MouseEvent<HTMLElement>) => {
    this.throttledEmitHoverEvent(e.clientX, e.clientY);
  }

  public async componentDidMount() {
    this.parseEditorContents();

    if (this.props.tabId) {
      // const res = await fetch(`/api/tabs/${this.props.tabId}`);
      // const json = res.json();
      // this.setState({
      //   enabled: true,
      //   value: (json as {contents: string}).contents,
      // });
    }
  }

  public componentWillUpdate() {
    if (this.codeMirrorInstance && !(this.codeMirrorInstance as any).curOp) {
      this.codeMirrorInstance.startOperation();
      this.ownedOperationId = (this.codeMirrorInstance as any).curOp.id;
    }
  }

  public componentDidUpdate() {
    if (this.codeMirrorInstance && (this.codeMirrorInstance as any).curOp.id === this.ownedOperationId) {
      this.codeMirrorInstance.endOperation();
      this.ownedOperationId = undefined;
    }
  }

  public render() {
    const sections = this.state.sections.map(this.componentForSection.bind(this));

    return <section id="editor">
      <div className="container">
        <EditorToolbar tabKnowledge={this.state.tabKnowledge} updateKnowledge={(knowledge) => this.updateKnowledge(knowledge)}/>
        { this.state.enabled || <LoadingEditorIndicator/> }
        <div onMouseOver={this.handleHover} onMouseLeave={this.handleHover} onMouseMove={this.handleHover}>
          <ControlledCodeMirror
            value={this.state.value}
            options={{
              theme: "elegant",
              foldGutter: true,
              lineNumbers: true,
              gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              viewportMargin: Infinity,
              fixedGutter: false,
            }}
            autoCursor={true}
            editorDidMount={(editor) => { this.codeMirrorInstance = editor; }}
            onBeforeChange={(editor, data, value) => {
              if (this.state.enabled) {
                this.setState({value});
                this.parseEditorContents();
              }
            }}
            onChange={(editor, data, value) => true }
          />
        </div>
        <div className="widgets">
          {sections}
        </div>
      </div>
    </section>;
  }

  private componentForSection = (section: TabSection) => {
    if (section instanceof TabStaffSection) {
      return <TabStaffWidgets
        key={section.key()}
        section={section}
        codemirror={this.codeMirrorInstance}
        tabKnowledge={this.state.tabKnowledge}
      />;
    }
    if (section instanceof ChordChartSection) {
      return <ChordChart
        key={section.key()}
        section={section}
        codemirror={this.codeMirrorInstance}
        hoverEvents={this.hoverEvents}
        tabKnowledge={this.state.tabKnowledge}
      />;
    }
    if (section instanceof ChordDefinitionSection) {
      return <ChordDefinitionWidgets
        key={section.key()}
        section={section}
        tabKnowledge={this.state.tabKnowledge}
        codemirror={this.codeMirrorInstance}
      />;
    }
    if (section instanceof UnrecognizedSection) {
      return <UnrecognizedWidget
        lineNumber={section.lineNumberForDisplay()}
        key={section.key()}
        section={section}
        codemirror={this.codeMirrorInstance}
      />;
    }
    throw new Error("Unrecognized tab section type!");
  }

  private updateKnowledge(tabKnowledge: TabKnowledge) {
    this.setState({tabKnowledge});
  }

  private throttledEmitHoverEvent(left: number, top: number) {
    this.hoverEvents.emit("hover", this.codeMirrorInstance.coordsChar({left, top}, "window"));
  }
}

/// <reference path="./codemirror-extension"/>
import * as React from "react";
import * as CodeMirror from "codemirror";
import * as _ from "lodash";
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
import { DebugSections } from "./debug_sections";
import "./codemirror_guitar_tab_mode";

interface IEditorProps {
  startValue: string;
  debugEnabled: boolean;
}

interface IEditorState {
  value: string;
  sections: TabSection[];
  tabKnowledge: TabKnowledge;
}

export class Editor extends React.Component<IEditorProps, IEditorState> {
  public codeMirrorInstance: CodeMirror.Editor;
  public parser: TabParser;
  private ownedOperationId?: number;

  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      value: props.startValue,
      sections: [],
      tabKnowledge: TabKnowledge.Default,
    };
    this.parser = new TabParser();
    this.parseEditorContents = _.debounce(this.parseEditorContents, 100);
  }

  public parseEditorContents() {
    console.trace()
    const parseResult = this.parser.parse(this.state.value);
    if (parseResult.succeeded) {
      this.setState({sections: parseResult.sections, tabKnowledge: parseResult.knowledge});
    }
  }

  public componentDidMount() {
    this.parseEditorContents();
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
      <div className="editor-container">
        <div className="container">
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
              this.setState({value});
              this.parseEditorContents();
            }}
            onChange={(editor, data, value) => true }
          />
          <div className="widgets">
            {sections}
          </div>
        </div>
      </div>
    </section>;
  }

  public componentForSection = (section: TabSection) => {
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
}

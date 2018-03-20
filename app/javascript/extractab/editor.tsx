import * as React from "react";
import * as CodeMirror from "codemirror";
import * as _ from "lodash";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/elegant.css";
import { TabParser, TabSection, ChordDefinitionSection, ChordChartSection, TabStaffSection, UnrecognizedSection } from "../guitar_tab";
import { UnrecognizedWidget } from "./unrecognized_widget";
import { ChordChartWidget } from "./chord_chart_widget";
import { ChordDefinitionWidget } from "./chord_definition_widget";
import { TabStaffWidget } from "./tab_staff_widget";
import { DebugSections } from "./debug_sections";

interface IEditorProps {
  startValue: string;
  debugEnabled: boolean;
}

interface IEditorState {
  value: string;
  sections: TabSection[];
}

export class Editor extends React.Component<IEditorProps, IEditorState> {
  public codeMirrorInstance: CodeMirror.Editor;
  public parser: TabParser;

  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      value: props.startValue,
      sections: [],
    };
    this.parser = new TabParser();
    this.parseEditorContents = _.debounce(this.parseEditorContents, 100);
  }

  public parseEditorContents() {
    const parseResult = this.parser.parse(this.state.value);
    if (parseResult.succeeded) {
      this.setState({sections: parseResult.sections});
    }
  }

  public componentDidMount() {
    this.parseEditorContents();
  }

  public render() {
    const sections = this.state.sections.map(this.componentForSection);

    return <section id="editor">
      <div className="container">
        <ControlledCodeMirror
          value={this.state.value}
          options={{theme: "elegant"}}
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
    </section>;
  }

  public componentForSection = (section: TabSection) => {
    if (section instanceof TabStaffSection) {
      return <TabStaffWidget key={section.source.startIdx} section={section} codemirror={this.codeMirrorInstance}/>;
    }
    if (section instanceof ChordChartSection) {
      return <ChordChartWidget key={section.source.startIdx} section={section} codemirror={this.codeMirrorInstance}/>;
    }
    if (section instanceof ChordDefinitionSection) {
      return <ChordDefinitionWidget key={section.source.startIdx} section={section} codemirror={this.codeMirrorInstance}/>;
    }
    if (section instanceof UnrecognizedSection) {
      return <UnrecognizedWidget key={section.source.startIdx} section={section} codemirror={this.codeMirrorInstance}/>;
    }
    throw new Error("Unrecognized tab section type!");
  }
}

import * as React from "react";
import * as CodeMirror from "codemirror";
import * as _ from "lodash";
import {Controlled as ControlledCodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/elegant.css";
import { TabParser, ITabSection } from "../guitar_tab";
import { UnrecognizedSectionWidget } from "./unrecognized_section_widget";
import { DebugSections } from "./debug_sections";

interface IEditorProps {
  startValue: string;
  debugEnabled: boolean;
}

interface IEditorState {
  value: string;
  sections: ITabSection[];
}

export class Editor extends React.Component<IEditorProps, IEditorState> {
  public codeMirrorInstance: any;
  public parser: TabParser;

  constructor(props: IEditorProps) {
    super(props);
    this.codeMirrorInstance = null;
    this.state = {
      value: props.startValue,
      sections: [],
    };
    this.parser = new TabParser();
    this.parseContents = _.debounce(this.parseContents, 100);
  }

  public parseContents() {
    const parseResult = this.parser.parse(this.state.value);
    if (parseResult.succeeded) {
      this.setState({sections: parseResult.sections});
    }
  }

  public componentDidMount() {
    this.parseContents();
  }

  public render() {
    const sections = this.state.sections.map(this.componentForSection);

    return <React.Fragment>
      <ControlledCodeMirror
        value={this.state.value}
        options={{theme: "elegant"}}
        autoCursor={true}
        editorDidMount={(editor) => { this.codeMirrorInstance = editor; }}
        onBeforeChange={(editor, data, value) => {
          this.setState({value});
          this.parseContents();
        }}
        onChange={(editor, data, value) => true }
      />
      <div className="widget-container">
      {sections}
      </div>
      {this.props.debugEnabled && <DebugSections sections={this.state.sections}/>}
    </React.Fragment>;
  }

  public componentForSection(section: ITabSection) {
    return <UnrecognizedSectionWidget line={10} key={section.source.startIdx}/>;
  }
}

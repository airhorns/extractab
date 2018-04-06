/// <reference path="./codemirror-extension"/>
/// <reference path="../guitar_tab/to_ast"/>
import * as React from "react";
import * as CodeMirror from "codemirror";
import * as _ from "lodash";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import { TabParser, TabSection, TabKnowledge } from "../guitar_tab";
import { toAST } from "../guitar_tab/to_ast";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/elegant.css";

interface IDebugState {
  value: string;
  sections: TabSection[];
  ast?: OhmASTNode;
  tabKnowledge: TabKnowledge;
}

type OhmASTNode = string | null | undefined | number | {
  type: string;
  contents: string;
  [key: string]: OhmASTNode | OhmASTNode[];
};

export class DebugEditor extends React.Component<{}, IDebugState> {
  public codeMirrorInstance: CodeMirror.Editor;
  public parser: TabParser;
  private ownedOperationId?: number;

  constructor(props: {}) {
    super(props);
    const params = new URLSearchParams(location.search);
    this.state = {
      value: params.get("text") || "Paste in debug text",
      sections: [],
      ast: undefined,
      tabKnowledge: TabKnowledge.Default,
    };
    this.parser = new TabParser();
    this.parseEditorContents = _.debounce(this.parseEditorContents, 100);
  }

  public parseEditorContents() {
    const parseResult = this.parser.parse(this.state.value);
    if (parseResult.succeeded) {
      const ast = toAST(parseResult.matchResult) as OhmASTNode;
      this.setState({sections: parseResult.sections, tabKnowledge: parseResult.knowledge, ast}, () => {
        const params = new URLSearchParams(location.search);
        params.set("text", this.state.value);
        window.history.replaceState({}, "", `${location.pathname}?${params}`);
      });
    }
  }

  public componentDidMount() {
    this.parseEditorContents();
  }

  public render() {
    return <section id="editor">
      <div className="container">
        <h1 className="title is-1">Debug</h1>
        <ControlledCodeMirror
          value={this.state.value}
          options={{
            theme: "elegant",
            lineNumbers: true,
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
        <div className="debug-ast">
          {this.state.ast && this.renderASTNode(this.state.ast)}
        </div>
      </div>
    </section>;
  }

  public renderASTNode = (node: OhmASTNode | OhmASTNode[], key: number | string = 0): JSX.Element | string => {
    if (_.isString(node) || _.isNumber(node) || _.isNull(node) || _.isUndefined(node)) {
      return _.toString(node);
    }
    if (_.isArray(node)) {
      return <React.Fragment>{node.map((innerNode, index) => this.renderASTNode(innerNode, index))}</React.Fragment>;
    }
    if (node.type === "any" || node.type === "lineSpace") {
      return node.contents;
    }

    const members = _.reduce(node, (result, value, innerKey) => {
      if (innerKey !== "type" && innerKey !== "contents") {
        result.push(<div className={"" + innerKey} key={innerKey}>{this.renderASTNode(value, innerKey)}</div>);
      }
      return result;
    }, [] as JSX.Element[]);

    return <div key={key} className={`ast-node ${members.length && "has-children"}`}>
      <h3><b>{node.type}</b> (parent index {key})</h3>
      <div><code>{this.renderRawContents(node.contents)}</code></div>
      {members}
    </div>;
  }

  public renderRawContents(str: string) {
    return _.flatten(str.split("\n").map((line) => [line, <br/>]));
  }
}

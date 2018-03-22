/// <reference path="./ohm-util"/>
import * as ohm from "ohm-js";
import * as CodeMirror from "codemirror";

export const intervalToCodemirrorMark = (source: ohm.Interval): [CodeMirror.Position, CodeMirror.Position] => {
  const start = ohm.util.getLineAndColumn(source.sourceString, source.startIdx);
  const end = ohm.util.getLineAndColumn(source.sourceString, source.endIdx);
  return [{line: start.lineNum - 1, ch: start.colNum - 1}, {line: end.lineNum - 1, ch: end.colNum - 1}];
};

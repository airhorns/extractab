import "codemirror/addon/mode/simple";
import * as CodeMirror from "codemirror";

// tslint:disable:interface-name
declare module "codemirror" {

  interface SimpleModeRule {
    regex: string | RegExp;
    token?: string | string[] | null;
    sol?: boolean;
    next?: boolean;
    push?: boolean;
    pop?: boolean;
    indent?: boolean;
    dedent?: boolean;
    dedentIfLineStart?: boolean;
    mode?: {
      spec: string | CodeMirror.Mode<any>;
      end: string | RegExp;
      persistent?: boolean;
    };
  }

  type SimpleModeMeta = Partial<CodeMirror.Mode<any>>;

  interface SimpleModeDefinition {
    meta: SimpleModeMeta;
    start: SimpleModeRule[];
    [stateName: string]: SimpleModeRule[] | SimpleModeMeta;
  }

  function defineSimpleMode(name: string, modeDefinition: SimpleModeDefinition): null;
}
// tslint:enable:interface-name

// CodeMirror.defineSimpleMode("guitar_tab", {
//   start: [
//     {regex: /[a-gA-G][#b]?((maj)|(min)|m|M|-)?((add)?6|7|9|(11)|(13))?(sus(4|2)?)?(\/[a-gA-G][#b]?)?(?=\s|\n|$)/, token: "chord"},
//   ],
//   meta: {
//     lineComment: "//"
//   },
// })

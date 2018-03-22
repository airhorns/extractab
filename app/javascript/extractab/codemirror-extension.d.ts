import * as CodeMirror from "codemirror";

// tslint:disable:interface-name
declare module "codemirror" {

  interface Editor {
    startOperation(): null;
    endOperation(): null;
    operation(func: () => null): null;
  }
}

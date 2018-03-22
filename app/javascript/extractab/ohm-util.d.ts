import * as ohm from "ohm-js";
// tslint:disable:interface-name no-namespace no-internal-module
declare module "ohm-js" {
  interface Interval {
    sourceString: string;
  }

  interface LineAndColumn {
    lineNum: number;
    colNum: number;
    line: string;
    prevLine: string;
    nextLine: string;
  }

  namespace util {
    function getLineAndColumn(str: string, offset: number): LineAndColumn;
  }
}
// tslint:enable:interface-name

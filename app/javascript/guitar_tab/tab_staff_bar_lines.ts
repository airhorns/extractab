import * as ohm from "ohm-js";

export class TabStaffBarLines {

  public static fromStaffLine(line: ohm.Node) {
    const indexes: number[] = [];
    const contents = line.source.contents;
    contents.replace(/\|/g, (match, index) => {
      // Ignore any barlines at the start or end
      if (index > 3 && index < (contents.length - 2)) {
        indexes.push(index);
      }
      return match;
    });

    return new TabStaffBarLines(indexes);
  }

  constructor(public lineSourceColumns: number[]) {}
}

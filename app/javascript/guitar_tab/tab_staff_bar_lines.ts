import * as ohm from "ohm-js";

export class TabStaffBarLines {

  public static fromStaffLine(line: ohm.Node) {
    const indexes: number[] = [];
    const contents = line.source.contents;
    contents.replace(/\|/g, (match, index) => {
      // Ignore a barline at the end of the line
      if (index < (contents.length - 2)) {
        indexes.push(index);
      }
      return match;
    });

    indexes.shift(); // remove the first barline that comes alongside the tuning
    return new TabStaffBarLines(indexes);
  }

  constructor(public lineSourceColumns: number[]) {}
}

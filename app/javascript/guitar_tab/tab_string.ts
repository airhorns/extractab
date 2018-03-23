import { TabHit } from "./tab_hit";

export interface ILinkagePosition {
  startColumn: number;
  endColumn: number;
}

export class TabString {
  constructor(public tuning: string, public hits: TabHit[]) {}

  // Loop over the tab hits on each string and compute the start and end columns of each linkage they might be a part of
  public computeLinkages(): ILinkagePosition[] {
    const linkages: ILinkagePosition[] = [];
    let openColumn: number | undefined;
    let cursorColumn: number | undefined;

    for (const hit of this.hits) {
      if (openColumn !== undefined && cursorColumn !== undefined) {
        // Linkage currently open. This next hit might:
        // - continue it (it is close enough to the cursor and has it's own linkage, like 3/4/<)
        // - end it (it is close enough to the cursor and has no linkage, like 3/4<)
        // - abort it (it is too far from the cursor such that the openend linkage doesnt make sense, like 3/-----4)

        if (hit.sourceColumn < cursorColumn + 9) {
          if (hit.linkage) {
            // Move the cursor along, this hit keeps it open
            cursorColumn = hit.sourceColumn;
          } else {
            // End the linkage because we're close to the cursor but this hit doesn't continue it
            linkages.push({startColumn: openColumn, endColumn: hit.sourceColumn});
            openColumn = undefined;
            cursorColumn = undefined;
          }
        } else {
          // We're too far away from the cursor for the currently open linkage to make sense, finish this linkage
          // if it is open, and abort it otherwise
          if (cursorColumn > openColumn) {
            linkages.push({startColumn: openColumn, endColumn: cursorColumn});
          }
          if (hit.linkage) {
            openColumn = hit.sourceColumn;
            cursorColumn = hit.sourceColumn;
          } else {
            openColumn = undefined;
            cursorColumn = undefined;
          }
        }
      } else {
        // No linkage is currently open, so open one if this hit does
        if (hit.linkage) {
          openColumn = hit.sourceColumn;
          cursorColumn = hit.sourceColumn;
        }
      }
    }

    // Add an open dangling linkage if the cursor has moved but was never expired or finished
    if (openColumn !== undefined && cursorColumn !== undefined && cursorColumn > openColumn) {
      linkages.push({startColumn: openColumn, endColumn: cursorColumn});
    }
    return linkages;
  }
}

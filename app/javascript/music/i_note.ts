import { Interval } from "./interval";
import { UnboundNote } from "./unbound_note";

export interface INote {
  semitonesAboveC: number;
  symbol: any;
  equivalent(note: INote): boolean;
  bound(): boolean;
  unbind(): UnboundNote;
  applyInterval(interval: Interval, forceFlat?: boolean, forceSharp?: boolean): INote;
  sharpEquivalent(): INote;
  flatEquivalent(): INote;
}

export interface INoteClass {
  sorter: (a: INote, b: INote) => number;
  new(...args: any[]): INote;
}

import { Interval } from "./interval";

export interface INote {
  semitonesAboveC: number;
  symbol: any;
  equivalent(note: INote): boolean;
  bound(): boolean;
  unbind(): INote;
  applyInterval(interval: Interval): INote;
}

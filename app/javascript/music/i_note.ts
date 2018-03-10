import { Interval } from "./interval";

export interface INote {
  semitonesAboveC: number;
  bound(): boolean;
  unbind(): INote;
  applyInterval(interval: Interval): INote;
}

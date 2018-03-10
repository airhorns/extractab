import { Interval } from './interval';

export interface INote {
  bound(): boolean;
  unbind(): INote;
  semitonesAboveC: number;
  applyInterval(interval: Interval): INote;
}

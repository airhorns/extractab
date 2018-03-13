import { Interval } from "./interval";
import { INote } from "./i_note";

export interface IChord<T extends INote> {
  root: T;
  intervals: ReadonlyArray<Interval>;
  notes(): T[];
  equivalent(chord: IChord<any>): boolean;
}

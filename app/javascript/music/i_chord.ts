import { Interval } from "./interval";
import { INote } from "./i_note";

export interface IChord<T extends INote> {
  root: T;
  notes(): ReadonlyArray<T>;
  displayLabel(): string;
  equivalent(chord: IChord<any>): boolean;
}

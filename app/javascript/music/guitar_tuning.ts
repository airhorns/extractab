import { BoundNote } from "./bound_note";

// Represents a tuning for a guitar as the list of notes played by plucking the open strings.
// Strings are 0-indexed from the top down of the tab
// 0th ->  e|---------------------------------|
// 1st ->  B|--------------0-1-0--------------|
// 2nd ->  G|----------0-2-------2-0----------|
// etc     D|----0-2-3---------------3-2-0----|
//         A|--3---------------------------3--|
//         E|---------------------------------|
export class GuitarTuning {
  public static Standard: GuitarTuning;
  public static DropD: GuitarTuning;
  public static Bass: GuitarTuning;

  constructor(public stringRoots: BoundNote[]) {}
  public tuningString(): string {
    return this.stringRoots.map((root) => root.symbolWithoutOctave).join(" ");
  }
}

GuitarTuning.Standard = new GuitarTuning([
  BoundNote.fromString("E2"),
  BoundNote.fromString("A3"),
  BoundNote.fromString("D3"),
  BoundNote.fromString("G3"),
  BoundNote.fromString("B4"),
  BoundNote.fromString("E4"),
]);

GuitarTuning.DropD = new GuitarTuning([
  BoundNote.fromString("D2"),
  BoundNote.fromString("A3"),
  BoundNote.fromString("D3"),
  BoundNote.fromString("G3"),
  BoundNote.fromString("B4"),
  BoundNote.fromString("E4"),
]);

GuitarTuning.Bass = new GuitarTuning([
  BoundNote.fromString("E1"),
  BoundNote.fromString("A2"),
  BoundNote.fromString("D2"),
  BoundNote.fromString("G2"),
]);

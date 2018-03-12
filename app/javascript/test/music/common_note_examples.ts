import { Intervals, INote } from "../../music";

export const CommonNoteExamples = (notes: { [s: string]: INote}) => {
  describe("Common note behaviour", () => {
    it("different note instances should be equal if they are the same number of semitones above c", () => {
      expect(notes.c).not.toEqual(notes.g);
      expect(notes.g).not.toEqual(notes.gFlat);
      expect(notes.g).not.toEqual(notes.gSharp);

      expect(notes.otherC).toEqual(notes.c);
    });

    it("different note instances should be equal if they are the same number of semitones above c even if they have different symbols", () => {
      expect(notes.gSharp.symbol).not.toEqual(notes.aFlat.symbol);
      expect(notes.gSharp.equivalent(notes.aFlat)).toEqual(true);
      expect(notes.aFlat.equivalent(notes.gSharp)).toEqual(true);
    });

    it("notes should report their semitones above c of their current octave", () => {
      expect(0).toEqual(notes.c.semitonesAboveC);
      expect(7).toEqual(notes.g.semitonesAboveC);
      expect(8).toEqual(notes.gSharp.semitonesAboveC);
    });

    it("applying an interval returns a new note that many semitones away from the original", () => {
      expect(notes.g).toEqual(notes.c.applyInterval(Intervals.PerfectFifth));
    });

    it("applying an interval to a sharp symbol returns a new note with a sharp symbol if necessary", () => {
      expect(notes.bFlat).toEqual(notes.gFlat.applyInterval(Intervals.MajorThird));
    });

    it("applying an interval to a flat symbol returns a new note with a flat symbol if necessary", () => {
      expect(notes.aSharp).toEqual(notes.gSharp.applyInterval(Intervals.MajorSecond));
    });
  });
};

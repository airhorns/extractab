import { UnboundNote, UnboundChord, ChordNames, Interval, Intervals } from "../../music";

describe("UnboundChord", () => {
  const c = UnboundNote.fromString("C");
  const g = UnboundNote.fromString("G");
  const a = UnboundNote.fromString("A");
  const cMajor = UnboundChord.forName(c, ChordNames.Major);
  const cMinor = UnboundChord.forName(c, ChordNames.Minor);
  const cMajor7 = UnboundChord.forName(c, ChordNames.MajorSeventh);
  const gMajor = UnboundChord.forName(g, ChordNames.Major);

  it("should report its root and intervals", () => {
    expect(cMajor.root).toEqual(c);
    expect(gMajor.root).toEqual(g);

    expect(cMajor.intervals).toEqual([Intervals.MajorThird, Intervals.PerfectFifth]);
  });

  it("spot checked chords should have the right notes", () => {
    expect("C E G").toEqual(cMajor.notesString());
    expect("C D# G").toEqual(cMinor.notesString());
    expect("C E G B").toEqual(cMajor7.notesString());
    expect("C D# G A#").toEqual(UnboundChord.forName(c, ChordNames.MinorSeventh).notesString());
    expect("C E G A#").toEqual(UnboundChord.forName(c, ChordNames.DominantSeventh).notesString());
    expect("C E G B D").toEqual(UnboundChord.forName(c, ChordNames.MajorNinth).notesString());
    expect("C D# G A# D").toEqual(UnboundChord.forName(c, ChordNames.MinorNinth).notesString());
    expect("C E G A# D").toEqual(UnboundChord.forName(c, ChordNames.Ninth).notesString());
    expect("C E G B F").toEqual(UnboundChord.forName(c, ChordNames.MajorEleventh).notesString());
    expect("C D# G A# F").toEqual(UnboundChord.forName(c, ChordNames.MinorEleventh).notesString());
    expect("C E G A# F").toEqual(UnboundChord.forName(c, ChordNames.Eleventh).notesString());
    expect("C E G B A").toEqual(UnboundChord.forName(c, ChordNames.MajorThirteenth).notesString());
    expect("C D# G A# A").toEqual(UnboundChord.forName(c, ChordNames.MinorThirteenth).notesString());
    expect("C E G A# A").toEqual(UnboundChord.forName(c, ChordNames.Thirteenth).notesString());
  });

  it("different chord instance should be equal if they have hte same root and the same intervals", () => {
    expect(cMajor).toEqual(cMajor);
    expect(cMajor).toEqual(UnboundChord.forName(c, ChordNames.Major));
    expect(cMajor).not.toEqual(gMajor);
    expect(cMajor).not.toEqual(cMajor7);
  });

  it("should reflect a new, negative interval to the substitute root if created with a substitute root not already included in the chord", () => {
    const cOverA = UnboundChord.forName(c, ChordNames.Major, a);
    expect(cOverA.root).toEqual(c);
    expect(cOverA.intervals).toEqual([new Interval(-3), Intervals.MajorThird, Intervals.PerfectFifth]);

    const cSharpOverA = UnboundChord.forName(UnboundNote.fromString("C#"), ChordNames.Major, a);
    expect(cSharpOverA.root).toEqual(UnboundNote.fromString("C#"));
    expect(cSharpOverA.intervals).toEqual([new Interval(-4), Intervals.MajorThird, Intervals.PerfectFifth]);

    const nonsense = UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.DominantSeventh, UnboundNote.fromString("D"));
    expect(nonsense.root).toEqual(UnboundNote.fromString("Gb"));
    expect(nonsense.intervals).toEqual([new Interval(-4), Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]);
  });

  it("should reflect a replacement, negative interval to the substitute root if created with a substitute root already included in the chord", () => {
    const cOverG = UnboundChord.forName(c, ChordNames.Major, g);
    expect(c).toEqual(cOverG.root);
    expect(cOverG.intervals).toEqual([new Interval(-5), Intervals.MajorThird]);

    const aOverE = UnboundChord.forName(a, ChordNames.Major, UnboundNote.fromString("E"));
    expect(UnboundNote.fromString("A")).toEqual(aOverE.root);
    expect(aOverE.intervals).toEqual([new Interval(-5), Intervals.MajorThird]);
  });

  it("should still be equal to other chords regardless of the order the intervals are given at construction time", () => {
    let left = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth]);
    let right = new UnboundChord(c, [Intervals.PerfectFifth, Intervals.MajorThird]);
    expect(left).toEqual(right);

    left = new UnboundChord(c, []);
    right = new UnboundChord(c, []);
    expect(left).toEqual(right);
  });

  it("should be equivalent to other chords with the same intervals, regardless of constructor order", () => {
    expect(cMajor.equivalent(cMajor)).toEqual(true);
    expect(UnboundChord.forName(c, ChordNames.Major).equivalent(cMajor)).toEqual(true);

    let left = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth]);
    let right = new UnboundChord(c, [Intervals.PerfectFifth, Intervals.MajorThird]);
    expect(left.equivalent(right)).toEqual(true);
    expect(right.equivalent(left)).toEqual(true);

    left = new UnboundChord(c, []);
    right = new UnboundChord(c, []);
    expect(left.equivalent(right)).toEqual(true);
    expect(right.equivalent(left)).toEqual(true);
  });

  it("should not be equivalent to other chords with different roots but the same intervals", () => {
    const left = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth]);
    const right = new UnboundChord(g, [Intervals.MajorThird, Intervals.PerfectFifth]);
    expect(left.equivalent(right)).toEqual(false);
    expect(right.equivalent(left)).toEqual(false);
  });

  it("should not be equivalent to other chords with the same root but different intervals", () => {
    expect(cMajor.equivalent(cMinor)).toEqual(false);
    expect(cMinor.equivalent(cMajor)).toEqual(false);

    expect(cMajor.equivalent(cMajor7)).toEqual(false);
    expect(cMajor7.equivalent(cMajor)).toEqual(false);
  });

  it("equivalent should return true for chords with different roots and intervals that compute to the same notes", () => {
    const left = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth]);
    const right = new UnboundChord(g, [Intervals.PerfectFourth, Intervals.MajorSixth]);

    expect(left.equivalent(right)).toEqual(true);
    expect(right.equivalent(left)).toEqual(true);
  });

  it("equivalent should return true for chords with the same notes even if some are duplicated", () => {
    const left = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth]);
    const right = new UnboundChord(c, [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.Octave.add(Intervals.MajorThird)]);

    expect(left.equivalent(right)).toEqual(true);
    expect(right.equivalent(left)).toEqual(true);
  });

  it("equivalent should return true for chords that have the same notes with equivalent but not identical roots", () => {
    const left = new UnboundChord(UnboundNote.fromString("Gb"), [Intervals.MajorThird, Intervals.PerfectFifth]);
    const right = new UnboundChord(UnboundNote.fromString("F#"), [Intervals.MajorThird, Intervals.PerfectFifth]);

    expect(left.root).not.toEqual(right.root);
    expect(left.root.equivalent(right.root)).toEqual(true);
    expect(left.equivalent(right)).toEqual(true);
    expect(right.equivalent(left)).toEqual(true);
  });
});
/*

    test "equivalent? returns true for chords with the same roots but where one chord has duplicates" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::OCTAVE + Intervals::MAJOR_THIRD])
      assert @left.equivalent?(@right)
      assert @right.equivalent?(@left)
    end
  end
end

*/

import { UnboundNote, UnboundChord, ChordNames, Intervals } from "../../music";

describe("UnboundChord", () => {
  const c = UnboundNote.fromString("C");
  const g = UnboundNote.fromString("G");
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

});
/*

    test "spot checked chords should have the right notes" do
      assert_equal "C E G", @c_major.notes_string
      assert_equal "C D# G", @c_minor.notes_string
      assert_equal "C E G B", @c_major_7.notes_string
      assert_equal "C D# G A#", UnboundChord.for(root: 'C', type: :minor_seventh).notes_string
      assert_equal "C E G A#", UnboundChord.for(root: 'C', type: :dominant_seventh).notes_string
      assert_equal "C E G B D", UnboundChord.for(root: 'C', type: :major_ninth).notes_string
      assert_equal "C D# G A# D", UnboundChord.for(root: 'C', type: :minor_ninth).notes_string
      assert_equal "C E G A# D", UnboundChord.for(root: 'C', type: :ninth).notes_string
      assert_equal "C E G B F", UnboundChord.for(root: 'C', type: :major_eleventh).notes_string
      assert_equal "C D# G A# F", UnboundChord.for(root: 'C', type: :minor_eleventh).notes_string
      assert_equal "C E G A# F", UnboundChord.for(root: 'C', type: :eleventh).notes_string
      assert_equal "C E G B A", UnboundChord.for(root: 'C', type: :major_thirteenth).notes_string
      assert_equal "C D# G A# A", UnboundChord.for(root: 'C', type: :minor_thirteenth).notes_string
      assert_equal "C E G A# A", UnboundChord.for(root: 'C', type: :thirteenth).notes_string
    end

    test "different chord instances should be equal if they have the same root and the same intervals" do
      refute_equal @c_major, @c_minor
      refute_equal @c_major, @c_major_7
      refute_equal @c_major, @g_major

      other_c_major = UnboundChord.for(root: 'C', type: :major)
      assert_equal other_c_major, @c_major
    end

    test "chords created with substitute roots included in the chord reflect an interval to that root" do
      @c_over_g = UnboundChord.for(root: 'C', type: :major, substitute_root: 'G')
      assert_equal @c, @c_over_g.root
      assert_equal [Interval.new(-5), Intervals::MAJOR_THIRD], @c_over_g.intervals

      @a_over_e = UnboundChord.for(root: 'A', type: :major, substitute_root: 'E')
      assert_equal UnboundNote.symbolic('A'), @a_over_e.root
      assert_equal [Interval.new(-5), Intervals::MAJOR_THIRD], @a_over_e.intervals
    end

    test "chords created with substitute roots not included in the chord reflect an interval to that root" do
      @c_over_a = UnboundChord.for(root: 'C', type: :major, substitute_root: 'A')
      assert_equal @c, @c_over_a.root
      assert_equal [Interval.new(-3), Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH], @c_over_a.intervals

      @c_sharp_over_a = UnboundChord.for(root: 'C#', type: :major, substitute_root: 'A')
      assert_equal UnboundNote.symbolic('C#'), @c_sharp_over_a.root
      assert_equal [Interval.new(-4), Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH], @c_sharp_over_a.intervals

      @nonsense = UnboundChord.for(root: 'Gb', type: :dominant_seventh, substitute_root: 'D')
      assert_equal UnboundNote.symbolic('Gb'), @nonsense.root
      assert_equal [Interval.new(-4), Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SEVENTH], @nonsense.intervals
    end

    test "chords created with intervals in different orders should still be equal if the intervals are the same" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@c, [Intervals::PERFECT_FIFTH, Intervals::MAJOR_THIRD])
      assert_equal @left, @right

      @left = UnboundChord.new(@c, [])
      @right = UnboundChord.new(@c, [])
      assert_equal @left, @right
    end

    test "equivalent? returns true for chords with intervals given in a different order" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@c, [Intervals::PERFECT_FIFTH, Intervals::MAJOR_THIRD])
      assert @left.equivalent?(@right)
      assert @right.equivalent?(@left)
    end

    test "equivalent? returns false for chords with different roots but the same intervals" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@g, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      refute @left.equivalent?(@right)
      refute @right.equivalent?(@left)
    end

    test "equivalent? returns false for chords with different intervals" do
      refute @c_major.equivalent?(@c_minor)
      refute @c_minor.equivalent?(@c_major)

      refute @c_major_7.equivalent?(@c_major)
      refute @c_major.equivalent?(@c_major_7)
    end

    test "equivalent? returns true for chords with different roots and intervals that lead to the same notes" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@g, [Intervals::PERFECT_FOURTH, Intervals::MAJOR_SIXTH])
      assert @left.equivalent?(@right)
      assert @right.equivalent?(@left)
    end

    test "equivalent? returns true for chords with the same roots but where one chord has duplicates" do
      @left = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH])
      @right = UnboundChord.new(@c, [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::OCTAVE + Intervals::MAJOR_THIRD])
      assert @left.equivalent?(@right)
      assert @right.equivalent?(@left)
    end
  end
end

*/

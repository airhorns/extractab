# frozen_string_literal: true
require 'test_helper'

module Music
  class UnboundChordTest < ActiveSupport::TestCase
    setup do
      @c = UnboundNote.symbolic('C')
      @c_major = UnboundChord.for(root: 'C', type: :major)
      @c_minor = UnboundChord.for(root: 'C', type: :minor)
      @c_major_7 = UnboundChord.for(root: 'C', type: :major_seventh)
      @g_major = UnboundChord.for(root: 'G', type: :major)
    end

    test "chords should report their root and their intervals" do
      assert_equal @c, @c_major.root
      assert_equal @c, @c_minor.root

      assert_equal [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH], @c_major.intervals
    end

    test "different chord instances should be equal if they have the same root and the same intervals" do
      refute_equal @c_major, @c_minor
      refute_equal @c_major, @c_major_seventh
      refute_equal @c_major, @g_major

      other_c_major = UnboundChord.for(root: 'C', type: :major)
      assert_equal other_c_major, @c_major
    end

    test "chords created with substitute roots included in the chord reflect an interval to that root" do
      @c_over_g = UnboundChord.for(root: 'C', type: :major, substitute_root: 'G')
      assert_equal @c, @c_over_g.root
      assert_equal [Intervals::MAJOR_THIRD, Interval.new(-5)], @c_over_g.intervals

      @a_over_e = UnboundChord.for(root: 'A', type: :major, substitute_root: 'E')
      assert_equal UnboundNote.symbolic('A'), @a_over_e.root
      assert_equal [Intervals::MAJOR_THIRD, Interval.new(-5)], @a_over_e.intervals
    end

    test "chords created with substitute roots not included in the chord reflect an interval to that root" do
      @c_over_a = UnboundChord.for(root: 'C', type: :major, substitute_root: 'A')
      assert_equal @c, @c_over_a.root
      assert_equal [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Interval.new(-3)], @c_over_a.intervals

      @c_sharp_over_a = UnboundChord.for(root: 'C#', type: :major, substitute_root: 'A')
      assert_equal UnboundNote.symbolic('C#'), @c_sharp_over_a.root
      assert_equal [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Interval.new(-4)], @c_sharp_over_a.intervals

      @nonsense = UnboundChord.for(root: 'Gb', type: :dominant_seventh, substitute_root: 'D')
      assert_equal UnboundNote.symbolic('Gb'), @nonsense.root
      assert_equal [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SEVENTH, Interval.new(-4)], @nonsense.intervals
    end
  end
end

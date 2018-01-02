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
    end

    test "chords created with substitute roots not included in the chord reflect an interval to that root" do
      @c_over_a = UnboundChord.for(root: 'C', type: :major, substitute_root: 'A')
      assert_equal @c, @c_over_a.root
      assert_equal [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Interval.new(-3)], @c_over_a.intervals
    end
  end
end

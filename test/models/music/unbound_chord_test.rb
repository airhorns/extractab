require 'test_helper'

class Music::UnboundChordTest < ActiveSupport::TestCase
  setup do
    @c = Music::UnboundNote.symbolic('C')
    @c_major = Music::UnboundChord.for(root: 'C', type: :major)
    @c_minor = Music::UnboundChord.for(root: 'C', type: :minor)
    @c_major_7 = Music::UnboundChord.for(root: 'C', type: :major_seventh)
    @g_major = Music::UnboundChord.for(root: 'G', type: :major)
  end

  test "chords should report their root and their intervals" do
    assert_equal @c, @c_major.root
    assert_equal @c, @c_minor.root

    assert_equal [Music::Intervals::MAJOR_THIRD, Music::Intervals::PERFECT_FIFTH], @c_major.intervals
  end

  test "different chord instances should be equal if they have the same root and the same intervals" do
    refute_equal @c_major, @c_minor
    refute_equal @c_major, @c_major_seventh
    refute_equal @c_major, @g_major

    other_c_major = Music::UnboundChord.for(root: 'C', type: :major)
    assert_equal other_c_major, @c_major
  end
end

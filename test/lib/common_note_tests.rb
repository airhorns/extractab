# frozen_string_literal: true
# Reused test suite to test that various Notelike doodads actually work roughly the same
module CommonNoteTests
  extend ActiveSupport::Concern

  included do
    test "notes should say they are notes" do
      assert @c.note?
    end

    test "different note instances should be equal if they are the same number of semitones above c" do
      refute_equal @c, @g
      refute_equal @g, @g_flat
      refute_equal @g, @g_sharp

      assert_equal @other_c, @c
    end

    test "different note instances should be equal if they are the same number of semitones above c even if they have different symbols" do
      refute_equal @g_sharp.symbol, @a_flat.symbol
      assert_equal @g_sharp, @a_flat
    end

    test "notes should sort from lowest to highest" do
      assert_equal [@c, @g_flat, @g, @g_sharp], [@c, @g, @g_sharp, @g_flat].sort
    end

    test "notes should report their semitones above c of their current octave" do
      assert_equal 0, @c.semitones_above_c
      assert_equal 7, @g.semitones_above_c
      assert_equal 8, @g_sharp.semitones_above_c
    end

    test "applying an interval returns a new note that many semitones away from the original" do
      assert_equal @g, @c.apply_interval(Music::Intervals::PERFECT_FIFTH)
    end

    test "applying an interval to a sharp symbol returns a new note with a sharp symbol if necessary" do
      assert_equal @b_flat, @g_flat.apply_interval(Music::Intervals::MAJOR_THIRD)
    end

    test "applying an interval to a flat symbol returns a new note with a flat symbol if necessary" do
      assert_equal @a_sharp, @g_sharp.apply_interval(Music::Intervals::MAJOR_SECOND)
    end
  end
end

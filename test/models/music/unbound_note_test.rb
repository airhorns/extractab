# frozen_string_literal: true
require 'test_helper'

module Music
  class UnboundNoteTest < ActiveSupport::TestCase
    setup do
      @c = UnboundNote.symbolic('C')
      @g = UnboundNote.symbolic('G')
      @g_flat = UnboundNote.symbolic('Gb')
      @g_sharp = UnboundNote.symbolic('G#')
    end

    test "notes should report their symbol and semitones above c" do
      assert_equal 'C', @c.symbol
      assert_equal 'G', @g.symbol
      assert_equal 'Gb', @g_flat.symbol
      assert_equal 'G#', @g_sharp.symbol

      assert_equal 0, @c.semitones_above_c
      assert_equal 7, @g.semitones_above_c
      assert_equal 6, @g_flat.semitones_above_c
      assert_equal 8, @g_sharp.semitones_above_c
    end

    test "different note instances should be equal if they are the same number of semitones above c" do
      refute_equal @c, @g
      refute_equal @g, @g_flat
      refute_equal @g, @g_sharp

      other_c = UnboundNote.symbolic('C')
      assert_equal other_c, @c
    end

    test "different note instances should be equal if they are the same number of semitones above c even if they have different symbols" do
      c_sharp = UnboundNote.symbolic('C#')
      d_flat = UnboundNote.symbolic('Db')
      refute_equal c_sharp.symbol, d_flat.symbol
      assert_equal c_sharp, d_flat
    end

    test "applying an interval returns a new note that many semitones away from the original" do
      assert_equal @g, @c.apply_interval(Intervals::PERFECT_FIFTH)
    end

    test "applying an interval to a sharp symbol returns a new note with a sharp symbol if necessary" do
      assert_equal UnboundNote.symbolic('Bb'), @g_flat.apply_interval(Intervals::MAJOR_THIRD)
    end

    test "applying an interval to a flat symbol returns a new note with a flat symbol if necessary" do
      assert_equal UnboundNote.symbolic('A#'), @g_sharp.apply_interval(Intervals::MAJOR_SECOND)
    end
  end
end

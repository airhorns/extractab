# frozen_string_literal: true
require 'test_helper'

class Music::UnboundNoteTest < ActiveSupport::TestCase
  setup do
    @c = Music::UnboundNote.symbolic('C')
    @g = Music::UnboundNote.symbolic('G')
    @g_flat = Music::UnboundNote.symbolic('Gb')
    @g_sharp = Music::UnboundNote.symbolic('G#')
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

    other_c = Music::UnboundNote.symbolic('C')
    assert_equal other_c, @c
  end

  test "different note instances should be equal if they are the same number of semitones above c even if they have different symbols" do
    c_sharp = Music::UnboundNote.symbolic('C#')
    d_flat = Music::UnboundNote.symbolic('Db')
    refute_equal c_sharp.symbol, d_flat.symbol
    assert_equal c_sharp, d_flat
  end
end

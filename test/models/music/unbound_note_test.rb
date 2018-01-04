# frozen_string_literal: true
require 'test_helper'

module Music
  class UnboundNoteTest < ActiveSupport::TestCase
    setup do
      @c = UnboundNote.symbolic('C')
      @g = UnboundNote.symbolic('G')
      @g_flat = UnboundNote.symbolic('Gb')
      @g_sharp = UnboundNote.symbolic('G#')
      @a_flat = UnboundNote.symbolic('Ab')
      @b_flat = UnboundNote.symbolic('Bb')
      @a_sharp = UnboundNote.symbolic('A#')
      @other_c = UnboundNote.symbolic('C')
    end

    include CommonNoteTests

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

    test "can be created from bound notes" do
      bound_note = BoundNote.symbolic('A#4')
      assert_equal UnboundNote.symbolic('A#'), UnboundNote.new(bound_note.symbol_without_octave)
    end
  end
end

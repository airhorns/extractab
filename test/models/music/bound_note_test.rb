# frozen_string_literal: true
require 'test_helper'

module Music
  class BoundNoteTest < ActiveSupport::TestCase
    setup do
      @c = BoundNote.symbolic('C4')
      @g = BoundNote.symbolic('G4')
      @g_flat = BoundNote.symbolic('Gb4')
      @g_sharp = BoundNote.symbolic('G#4')
      @a_flat = BoundNote.symbolic('Ab4')
      @b_flat = BoundNote.symbolic('Bb4')
      @a_sharp = BoundNote.symbolic('A#4')
      @other_c = BoundNote.symbolic('C4')
    end

    include CommonNoteTests

    test "notes should report their symbol and semitones above c" do
      assert_equal 'C4', @c.symbol.to_s
      assert_equal 'G4', @g.symbol.to_s
      assert_equal 'Gb4', @g_flat.symbol.to_s
      assert_equal 'G#4', @g_sharp.symbol.to_s
    end

    test "can find notes using a symbol" do
      assert_equal 261.626, BoundNote.symbolic('C4').frequency
      assert_equal 440, BoundNote.symbolic('A4').frequency
    end

    test "can find notes using a frequency" do
      assert_equal "A4", BoundNote.new(440).symbol.to_s
      assert_equal "C4", BoundNote.new(261.626).symbol.to_s
    end
  end
end

# frozen_string_literal: true
require 'test_helper'

module Music
  class ChordFrettingTest < ActiveSupport::TestCase
    setup do
      @c_major = Music::UnboundChord.for(root: 'C', type: :major)
      @c4 = Music::Note.symbolic('C4')
      @tuning = Music::GuitarTuning::STANDARD
    end

    test "returns bound chords from unbound frets relative to a tuning" do
      fretting = Music::ChordFretting.new(labeled_chord: @c_major, frets: [nil, 3, 2, 0, 1, 0])

      assert @c_major.equivalent?(fretting.bind_at_tuning(@tuning))
    end
  end
end

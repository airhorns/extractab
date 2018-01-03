# frozen_string_literal: true

module Music
  class ChordFretting
    attr_reader :chord, :frets

    def initialize(chord:, frets:)
      @chord = chord
      @frets = frets
    end
  end
end

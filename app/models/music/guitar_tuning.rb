# frozen_string_literal: true
module Music
  class GuitarTuning
    attr_reader :strings

    def initialize(strings:)
      raise "Guitar tuning must be bound to real notes" unless strings.all? { |string| string.is_a?(BoundNote) }
      @strings = strings
    end

    STANDARD = new(strings: [
      BoundNote.symbolic('E2'),
      BoundNote.symbolic('A3'),
      BoundNote.symbolic('D3'),
      BoundNote.symbolic('G3'),
      BoundNote.symbolic('B4'),
      BoundNote.symbolic('E4')
    ])

    BASS_STANDARD = new(strings: [
      BoundNote.symbolic('E1'),
      BoundNote.symbolic('A2'),
      BoundNote.symbolic('D2'),
      BoundNote.symbolic('G2')
    ])
  end
end

# frozen_string_literal: true
module Music
  class NoteSymbol
    def self.parse(string)
      match = string.match(/^([A-Ga-g][#b]?)([0-8]?)$/)

      raise ArgumentError, "Did not recognize note string: #{note_string}" unless match
      raise ArgumentError, 'No octave found or specified' if match[2].empty?
      raise ArgumentError, 'Octave must be > 0 and < 9' if match[2].to_i > 8

      new(match[1], match[2].to_i)
    end

    attr_reader :letter, :octave

    def initialize(letter, octave)
      @letter = letter
      @octave = octave
    end

    def to_s
      @letter + @octave.to_s
    end

    def ==(other)
      if other.class == self.class
        other.letter == letter && other.octave == octave
      end
    end
  end
end

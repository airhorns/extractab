# frozen_string_literal: true
module Music
  # Grab bag of methods that knows how to convert notes between their physical representation as an oscillation
  # at a particular frequency and a symbolic repsentation in Scientific Pitch Notation, which is just a fancy way
  # of saying something like C4 (middle C), A4 (the A above middle C), or Bb3.
  module FrequencyConverter
    def self.symbol_for_frequency(frequency)
      # h = 12 log(P / C) / log 2 if C is the frequency of middle C, but we use A = 440hz for accuracy, which is 9 semitones away
      semitones_above_a4 = 12 * Math.log(frequency / 440.0) / Math.log(2)
      semitones_above_c4 = (semitones_above_a4 + 9).round
      octaves_above_middle_c = 4 + (semitones_above_c4 / 12) # use integer division to get floor of division by 12
      semitones_above_c = semitones_above_c4 % 12

      letter = UnboundNote::SEMITONES_TO_SHARP_NOTES.fetch(semitones_above_c)
      NoteSymbol.new(letter, octaves_above_middle_c)
    end

    def self.frequency_for_symbol(symbol)
      raise ArgumentError unless symbol.is_a?(NoteSymbol)
      semitones_above_c = UnboundNote::NOTES_TO_SEMITONES.fetch(symbol.letter)
      octaves_above_c4 = 4 - symbol.octave

      # A is 9 semitones above C
      semitones_above_a4 = (semitones_above_c - 9) + (octaves_above_c4 * 12)

      # Compute twelfth root of two relative to A4 at 440hz
      # P = C * 2^(h/12) if C is the frequency of middle C, but we use A = 440hz for accuracy
      # See https://en.wikipedia.org/wiki/Scientific_pitch_notation
      (440 * 2**(semitones_above_a4 / 12.0)).round(3)
    end
  end
end

# frozen_string_literal: true

module Music
  # Represents a note on the piano. The note is unbound because it's not set at any particular frequency or in
  # any particular octave. It's just floating, so an Unbound C note corresponds to all the C keys on a piano
  # or all the frets on any string of a guitar that would play a C note. This is useful for representing chords
  # and scales and whatnot in the abstract before grounding them somewhere exactly on a staff.
  class UnboundNote
    NOTES_TO_SEMITONES = {
      'C' => 0,
      'C#' => 1,
      'Db' => 1,
      'D' => 2,
      'D#' => 3,
      'Eb' => 3,
      'E' => 4,
      'F' => 5,
      'F#' => 6,
      'Gb' => 6,
      'G' => 7,
      'G#' => 8,
      'Ab' => 8,
      'A' => 9,
      'A#' => 10,
      'Bb' => 10,
      'B' => 11
    }
    SEMITONES_TO_FLAT_NOTES = NOTES_TO_SEMITONES.reject { |k, _v| k.include? '#' }.invert
    SEMITONES_TO_SHARP_NOTES = NOTES_TO_SEMITONES.reject { |k, _v| k.include? 'b' }.invert

    class << self
      def symbolic(string_or_note)
        if string_or_note.respond_to?(:note?) && string_or_note.note?
          if string_or_note.bound?
            new(string_or_note.symbol_without_octave)
          else
            string_or_note
          end
        else
          new(string_or_note.to_s)
        end
      end
    end

    attr_reader :symbol, :semitones_above_c

    def initialize(normalized_symbol)
      @symbol = normalized_symbol
      @semitones_above_c = NOTES_TO_SEMITONES.fetch(@symbol)
    end

    include Comparable
    def <=>(other)
      if other.class == self.class
        semitones_above_c <=> other.semitones_above_c
      else
        -1
      end
    end

    def ==(other)
      if other.class == self.class
        semitones_above_c == other.semitones_above_c
      end
    end
    alias_method :eql?, :==

    def hash
      @symbol.hash
    end

    def apply_interval(interval)
      positive_semitones = (semitones_above_c + interval.semitones) % 12 # use modulo operator to get positive result for lookup table
      new_symbol = if symbol.include? 'b'
        SEMITONES_TO_FLAT_NOTES[positive_semitones]
      else
        SEMITONES_TO_SHARP_NOTES[positive_semitones]
      end

      self.class.new(new_symbol)
    end

    def note?
      true
    end

    def bound?
      false
    end

    def unbind
      self
    end
  end
end

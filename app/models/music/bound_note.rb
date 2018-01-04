# frozen_string_literal: true

module Music
  # Represents a note on the piano at a specific frequency (and in a specific octave). Can be thought of as a specific
  # fret on a guitar or a specific key on a piano. Useful for representing actual music that might be printed out
  # as sheet music or a guitar tab or what have you.
  class BoundNote
    def self.symbolic(string_or_note)
      if string_or_note.respond_to?(:note?) && string_or_note.note?
        if string_or_note.bound?
          string_or_note
        else
          raise "Can't create BoundNote from UnboundNote #{string_or_note.inspect}"
        end
      else
        symbol = NoteSymbol.parse(string_or_note.to_s)
        frequency = FrequencyConverter.frequency_for_symbol(symbol)
        new(frequency, symbol)
      end
    end

    attr_reader :symbol, :frequency

    def initialize(frequency, symbol = nil)
      @frequency = frequency
      @symbol = if symbol.nil?
        FrequencyConverter.symbol_for_frequency(frequency)
      elsif symbol.is_a?(NoteSymbol)
        symbol
      else
        NoteSymbol.parse(symbol)
      end
    end

    include Comparable
    def <=>(other)
      if other.class == self.class
        frequency <=> other.frequency
      else
        -1
      end
    end

    def ==(other)
      if other.class == self.class
        frequency == other.frequency
      end
    end
    alias_method :eql?, :==

    def apply_interval(interval)
      new_octave, new_letter_index = (octave * 12 + semitones_above_c + interval.semitones).divmod(12)
      new_symbol = if symbol.letter.include? 'b'
        UnboundNote::SEMITONES_TO_FLAT_NOTES.fetch(new_letter_index)
      else
        UnboundNote::SEMITONES_TO_SHARP_NOTES.fetch(new_letter_index)
      end

      symbol = NoteSymbol.new(new_symbol, new_octave)
      frequency = FrequencyConverter.frequency_for_symbol(symbol)
      self.class.new(frequency, symbol)
    end

    def hash
      @frequency.hash
    end

    def symbol_without_octave
      @symbol.letter
    end

    def bound?
      true
    end

    def note?
      true
    end

    def unbind
      UnboundNote.new(symbol_without_octave)
    end

    def semitones_above_c
      UnboundNote::NOTES_TO_SEMITONES.fetch(@symbol.letter)
    end

    def semitones_above_c4
      (octave - 4) * 12 + semitones_above_c
    end

    def octave
      @symbol.octave
    end
  end
end

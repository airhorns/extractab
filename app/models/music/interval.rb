# frozen_string_literal: true
module Music
  class Interval
    attr_reader :semitones

    class << self
      def from(from_note, to_note)
        new(to_note.semitones_above_c - from_note.semitones_above_c)
      end
    end

    def initialize(semitones)
      @semitones = semitones
    end

    def to_interval
      self
    end

    def ==(other)
      if other.class == self.class
        semitones == other.semitones
      end
    end
    alias_method :eql?, :==

    def hash
      semitones.hash
    end

    def invert
      inverted = if semitones >= 0
        (semitones - 12).remainder(12)
      else
        (semitones + 12).remainder(12)
      end

      self.class.new(inverted)
    end

    def positive_inversion
      if semitones < 0
        invert
      else
        self
      end
    end

    include Comparable
    def <=>(other)
      if other.class == self.class
        semitones <=> other.semitones
      else
        -1
      end
    end

    def +(other)
      raise "Can't add an Interval to #{other.class}" unless other.respond_to?(:semitones)
      self.class.new((semitones + other.semitones) % 12)
    end
  end
end

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

    def eql?(other)
      if other.class == self.class
        semitones == other.semitones
      end
    end

    def invert
      self.class.new( -12 + semitones )
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
      self.class.new(self.semitones + other.semitones % 12)
    end
  end
end

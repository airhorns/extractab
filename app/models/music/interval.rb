# frozen_string_literal: true
module Music
  class Interval
    attr_reader :semitones

    class << self
      def from(from_note, to_note)
        if from_note.bound? && to_note.bound?
          new(to_note.semitones_above_a4 - from_note.semitones_above_a4)
        elsif !from_note.bound? && !to_note.bound?
          new(to_note.semitones_above_c - from_note.semitones_above_c)
        else
          raise "Can't compute interval from #{from_note.inspect} to #{to_note.inspect} because they both aren't bound or unbound"
        end
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

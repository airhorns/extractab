# frozen_string_literal: true
module Music
  class Interval
    attr_reader :semitones

    def initialize(semitones)
      @semitones = semitones
    end

    def to_interval
      self
    end

    def eql?(other)
      if other.class == self.class
        self.semitones == other.semitones
      end
    end
  end
end

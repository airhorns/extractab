# frozen_string_literal: true
module Music
  class UnboundChord
    class UnknownChordTypeException < RuntimeError; end
    CHORD_INTERVALS = {
      minor: [Intervals::MINOR_THIRD, Intervals::PERFECT_FIFTH],
      major: [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH],
      fifth: [Intervals::PERFECT_FIFTH],
      diminished: [Intervals::MINOR_THIRD, Intervals::DIMINISHED_FIFTH],
      augmented: [Intervals::MAJOR_THIRD, Intervals::AUGMENTED_FIFTH],
      major_seventh: [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MAJOR_SEVENTH],
      minor_seventh: [Intervals::MINOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SEVENTH],
      diminished_seventh: [Intervals::MINOR_THIRD, Intervals::DIMINISHED_FIFTH, Intervals::DIMINISHED_SEVENTH],
      augmented_seventh: [Intervals::MAJOR_THIRD, Intervals::AUGMENTED_FIFTH, Intervals::MINOR_SEVENTH],
      major_minor_seventh: [Intervals::MAJOR_THIRD, Intervals::AUGMENTED_FIFTH, Intervals::MINOR_SEVENTH],
      half_diminished_seventh: [Intervals::MINOR_THIRD, Intervals::DIMINISHED_FIFTH, Intervals::MINOR_SEVENTH]
    }

    class << self
      def for(root:, type:)
        raise UnknownChordTypeException, "No chord type of #{type} known" unless CHORD_INTERVALS.include?(type)
        root = Music::UnboundNote.symbolic(root) unless root.respond_to?(:note?) && root.note?
        new(root, CHORD_INTERVALS[type])
      end
    end

    attr_reader :root, :intervals

    def initialize(root, intervals)
      raise "Root note of a chord must be a Note class" unless root.respond_to?(:note?) && root.note?
      @root = root
      @intervals = intervals.map(&:to_interval)
    end

    def notes
      @intervals.map { |interval| root.apply_interval(interval) }.unshift(@root)
    end

    def ==(other)
      if other.class == self.class
        self.root == other.root &&
          self.intervals.zip(other.intervals).all? { |self_interval, other_interval| self_interval == other_interval }
      end
    end
    alias :eql? :==
  end
end

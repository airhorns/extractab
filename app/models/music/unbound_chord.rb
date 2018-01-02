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
      major_sixth: [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MAJOR_SIXTH],
      minor_sixth: [Intervals::MINOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MAJOR_SIXTH],
      major_seventh: [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MAJOR_SEVENTH],
      minor_seventh: [Intervals::MINOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SEVENTH],
      diminished_seventh: [Intervals::MINOR_THIRD, Intervals::DIMINISHED_FIFTH, Intervals::DIMINISHED_SEVENTH],
      augmented_seventh: [Intervals::MAJOR_THIRD, Intervals::AUGMENTED_FIFTH, Intervals::MINOR_SEVENTH],
      dominant_seventh: [Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SEVENTH],
      minor_major_seventh: [Intervals::MINOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MAJOR_SEVENTH],
      half_diminished_seventh: [Intervals::MINOR_THIRD, Intervals::DIMINISHED_FIFTH, Intervals::MINOR_SEVENTH]
    }.each { |_, v| v.freeze }.freeze

    class << self
      def for(root:, type:, substitute_root: nil)
        raise UnknownChordTypeException, "No chord type of #{type} known" unless CHORD_INTERVALS.include?(type)
        root = Music::UnboundNote.symbolic(root)
        intervals = CHORD_INTERVALS[type]

        if substitute_root
          substitute_root = Music::UnboundNote.symbolic(substitute_root)
          intervals = intervals.dup

          positive_interval = Music::Interval.from(root, substitute_root).positive_inversion
          negative_interval = positive_interval.invert
          intervals.delete(positive_interval)
          intervals << negative_interval
        end

        new(root, intervals)
      end
    end

    attr_reader :root, :intervals

    def initialize(root, intervals)
      raise "Root note of a chord must be a Note class" unless root.respond_to?(:note?) && root.note?
      raise "Can't have duplicate notes in a chord, got: #{intervals.inspect} " unless intervals.uniq.size == intervals.size
      @root = root
      @intervals = intervals.map(&:to_interval)
    end

    def notes
      @intervals.map { |interval| root.apply_interval(interval) }.unshift(@root)
    end

    def ==(other)
      if other.class == self.class
        root == other.root &&
          intervals.zip(other.intervals).all? { |self_interval, other_interval| self_interval == other_interval }
      end
    end
    alias_method :eql?, :==
  end
end

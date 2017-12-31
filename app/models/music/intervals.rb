# frozen_string_literal: true
module Music
  module Intervals
    MINOR_SECOND = Interval.new(1)
    MAJOR_SECOND = Interval.new(2)
    MINOR_THIRD = Interval.new(3)
    MAJOR_THIRD = Interval.new(4)

    PERFECT_FOURTH = Interval.new(5)

    TRITONE = Interval.new(6)
    DIMINISHED_FIFTH = Interval.new(6)
    FLAT_FIFTH = Interval.new(6)
    AUGMENTED_FOURTH = Interval.new(6)

    PERFECT_FIFTH = Interval.new(7)

    AUGMENTED_FIFTH = Interval.new(8)
    MINOR_SIXTH = Interval.new(8)

    MAJOR_SIXTH = Interval.new(9)
    DIMINISHED_SEVENTH = Interval.new(9)

    MINOR_SEVENTH = Interval.new(10)
    MAJOR_SEVENTH = Interval.new(11)
  end
end

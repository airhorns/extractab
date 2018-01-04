# frozen_string_literal: true
require 'test_helper'

module Music
  class IntervalTest < ActiveSupport::TestCase
    test "different interval instances with the same semitone are equal" do
      assert_equal Interval.new(0), Interval.new(0)
      assert_equal Interval.new(5), Interval.new(5)
      assert_equal Intervals::PERFECT_FIFTH, Intervals::PERFECT_FIFTH

      assert_equal [Interval.new(3)], [Interval.new(3), Interval.new(3)].uniq
    end

    test "intervals going up and down that land on the same note are not equal since they wouldn't sound the same" do
      note = UnboundNote.symbolic('C')
      down = Interval.new(-5)
      up = Interval.new(7)

      refute_equal down, up
      assert_equal note.apply_interval(down).symbol, note.apply_interval(up).symbol
    end

    test "positive intervals can be inverted to become negative" do
      assert_equal Interval.new(0), Interval.new(0).invert
      assert_equal Interval.new(-5), Interval.new(7).invert
      assert_equal Interval.new(-1), Interval.new(11).invert
    end

    test "negative intervals can be inverted to become positive" do
      assert_equal Interval.new(5), Interval.new(-7).invert
      assert_equal Interval.new(1), Interval.new(-11).invert
    end

    test "double inversion should lead back to the same interval" do
      assert_equal Interval.new(-7), Interval.new(-7).invert.invert
      assert_equal Interval.new(11), Interval.new(11).invert.invert
    end

    test "positive or negative intervals can be forced to positive via positive inversion" do
      assert_equal Interval.new(5), Interval.new(-7).positive_inversion
      assert_equal Interval.new(11), Interval.new(11).positive_inversion
    end

    test "intervals should sort from lowest to highest" do
      assert_equal [Intervals::MAJOR_SECOND, Intervals::MAJOR_THIRD, Intervals::PERFECT_FIFTH, Intervals::MINOR_SIXTH], [Intervals::MINOR_SIXTH, Intervals::MAJOR_THIRD, Intervals::MAJOR_SECOND, Intervals::PERFECT_FIFTH].sort
    end
  end
end

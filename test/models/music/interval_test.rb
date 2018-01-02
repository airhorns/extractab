# frozen_string_literal: true
require 'test_helper'

module Music
  class IntervalTest < ActiveSupport::TestCase
    test "intervals can be inverted to become negative" do
      assert_equal Interval.new(-5), Intervals::PERFECT_FIFTH.invert
    end
  end
end

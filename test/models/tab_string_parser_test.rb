# frozen_string_literal: true
require 'test_helper'

class TabStringParserTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @tab_staff_transform = TabStaffTransform.new
  end

  test "it parses a hit on a fret at a position" do
    actual = parse("A|--3-|\n")
    assert_equal Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [3])]), actual

    actual = parse("A|3---|\n")
    assert_equal Music::TabStaff::String.new('A', 2, [Music::TabHit.new(2, [3])]), actual

    actual = parse("A|---3|\n")
    assert_equal Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [3])]), actual
  end

  test "it parses hammer ons" do
    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [3, 4], [:slur])])
    assert_equal expected, parse("A|---3h4-|\n")
    assert_equal expected, parse("A|---3H4-|\n")
    assert_equal expected, parse("A|---3H4|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [10, 12], [:slur])])
    assert_equal expected, parse("A|---10h12-|\n")
    assert_equal expected, parse("A|---10h12|\n")
  end

  test "it parses pull offs" do
    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [4, 3], [:slur])])
    assert_equal expected, parse("A|---4p3-|\n")
    assert_equal expected, parse("A|---4P3-|\n")
    assert_equal expected, parse("A|---4P3|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [12, 10], [:slur])])
    assert_equal expected, parse("A|---12p10-|\n")
    assert_equal expected, parse("A|---12p10|\n")
  end

  test "it parses chained hammerons and pulloffs" do
    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [3, 4, 5], [:slur, :slur])])
    assert_equal expected, parse("A|---3h4h5|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(5, [3, 4, 5, 4, 3, 4], [:slur, :slur, :slur, :slur, :slur])])
    assert_equal expected, parse("A|---3h4h5p4p3h4|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [10, 12, 9, 8], [:slur, :slur, :slur])])
    assert_equal expected, parse("A|--10h12p9p8--|\n")
  end

  test "it parses slides" do
    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [3, 4, 5], [:slide, :slide])])
    assert_equal expected, parse("A|--3/4/5--|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [11, 10, 9], [:slide, :slide])])
    assert_equal expected, parse("A|--11/10/9--|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(2, [11, 10, 9], [:slide, :slide])])
    assert_equal expected, parse("A|11/10/9---|\n")
  end

  test "it parses multihits with trailing ligatures" do
    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [3, 4, 5], [:slide, :slide, :slide])])
    assert_equal expected, parse("A|--3/4/5/--|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [11, 10, 9], [:slur, :slur, :slur])])
    assert_equal expected, parse("A|--11p10p9p--|\n")

    expected = Music::TabStaff::String.new('A', 2, [Music::TabHit.new(2, [11, 10, 9], [:slide, :slide, :slide])])
    assert_equal expected, parse("A|11/10/9/---|\n")
  end

  def parse(text)
    parsed = @parser.tab_staff_line.parse(text)
    @tab_staff_transform.apply(parsed)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~TAB"
    puts text
    puts "TAB"
    raise
  end
end

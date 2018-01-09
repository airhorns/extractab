# frozen_string_literal: true
require 'test_helper'

class TabStaffSectionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @tab_staff_transform = TabStaffTransform.new
  end

  test "it parses a hit on a fret at a position" do
    actual = parse <<~TAB
      E|----|
      D|----|
      A|--3-|
      E|----|
    TAB

    expected = Music::TabStaff.new([
      Music::TabStaff::String.new('E', 2, []),
      Music::TabStaff::String.new('A', 2, [Music::TabHit.new(4, [3])]),
      Music::TabStaff::String.new('D', 2, []),
      Music::TabStaff::String.new('E', 2, [])
    ])

    assert_equal expected, actual
  end

  test "it parses a c major scale" do
    actual = parse <<~TAB
      e|---------------------------------|
      B|--------------0-1-0--------------|
      G|----------0-2-------2-0----------|
      D|----0-2-3---------------3-2-0----|
      A|--3---------------------------3--|
      E|---------------------------------|
    TAB
    expected = Music::TabStaff.new([
      Music::TabStaff::String.new('E', 2, []),
      Music::TabStaff::String.new('A', 2, [
        Music::TabHit.new(4, [3]),
        Music::TabHit.new(32, [3])
      ]),
      Music::TabStaff::String.new('D', 2, [
        Music::TabHit.new(6, [0]),
        Music::TabHit.new(8, [2]),
        Music::TabHit.new(10, [3]),
        Music::TabHit.new(26, [3]),
        Music::TabHit.new(28, [2]),
        Music::TabHit.new(30, [0])
      ]),
      Music::TabStaff::String.new('G', 2, [
        Music::TabHit.new(12, [0]),
        Music::TabHit.new(14, [2]),
        Music::TabHit.new(22, [2]),
        Music::TabHit.new(24, [0])
      ]),
      Music::TabStaff::String.new('B', 2, [
        Music::TabHit.new(16, [0]),
        Music::TabHit.new(18, [1]),
        Music::TabHit.new(20, [0])
      ]),
      Music::TabStaff::String.new('e', 2, [])
    ])

    assert_equal expected, actual
  end

  test "it parses crossfire dot txt tab" do
    parse <<~TAB
      E|------|----7--7----------7-7-------|-----7--7----------4-------|
      B|------|----7--7----------7-7-------|-----7--7----------5-------|
      G|------|----7--7----------7-7-------|-----7--7----------4-------|
      D|------|----7--7----------7-7-------|-----7--7----------6-------|
      A|------|---9------------9-----------|---9-------5/7-4-4-4-------|
      E|-5/6/-|-7--------5/6/7--------5/6/-|-7---------------4-4--5/6/-|
    TAB
  end

  test "it parses stairway to heaven tabs" do
    parse <<~TAB
      E|-3---3-3-3--3--0-0-|-2-------2-------|-3--3-3-3--3--0-0---7-|--5---3---5----|
      B|-1---1-1-1--1--1-3-|-3--3--3---3-0-0-|-1--1-1-1--1--1-1---8-|--7---5---7----|
      G|-2---2-2-2--2--2-2-|-2-----------0-0-|-2--2-2-2--2--2-2---9-|--7---5---7----|
      D|-2---2-2-2--2--2---|---0-------------|-2--2-2-2--2--2-2---0-|-------------0-|
      A|-------------------|-----------------|----------------------|-------------0-|
      E|-------------------|-----------------|----------------------|---------------|
    TAB

    parse <<~TAB
      E|-------0-2-----2-|-0-----------------|---------2-----2-|-0-0-0-----------|
      B|-----------3-----|---1--1--0 1-------|-1-----1---3-----|-1-1-1-----------|
      G|-----0-------2---|-----2-------2-----|---0---------2---|-2-2-2-----------|
      D|---2-----0-------|-3-----------------|-----2---0-------|-3-3-3-----------|
      A|-3---------------|---------------0-2-|-3---------------|-----------------|
      E|-----------------|-------------------|-----------------|-----------------|
    TAB

    parse <<~TAB
      E|-3--3-3-3--3--0-0---7-|--5---3---5----|
      B|-1--1-1-1--1--1-1---8-|--7---5---7----|
      G|-2--2-2-2--2--2-2---9-|--7---5---7----|
      D|-2--2-2-2--2--2-2---0-|----------0----|
      A|----------------------|-------------0-|
      E|----------------------|---------------|
    TAB
  end

  def parse(text)
    parsed = @parser.tab_lines.parse(text)
    @tab_staff_transform.apply(parsed)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~TAB"
    puts text
    puts "TAB"
    raise
  end
end

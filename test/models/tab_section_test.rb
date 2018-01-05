# frozen_string_literal: true
require 'test_helper'

class TabSectionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @tab_transform = TabTransform.new
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

  def parse(text)
    parsed = @parser.tab_lines.parse(text)
    chorded = @tab_transform.apply(parsed)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~TAB"
    puts text
    puts "TAB"
    raise
  end
end

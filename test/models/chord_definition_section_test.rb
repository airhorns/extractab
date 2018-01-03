# frozen_string_literal: true
require 'test_helper'

class ChordDefinitionSectionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @chord_transform = ChordTransform.new
    @definition_transform = ChordDefinitionTransform.new
  end

  test "it recognizes chords with 6 string single digit frets" do
    expected = [{ chord: { chord_root: "A", major_minor: nil, extension_separator: nil, extension_modifier: nil, extension: "6" } }, { fret: "x" }, { fret: "x" }, { fret: "7" }, { fret: "6" }, { fret: "7" }, { fret: "x" }, { chord: { chord_root: "A", major_minor: "maj", extension_separator: nil, extension_modifier: nil, extension: "7" } }, { fret: "5" }, { fret: "x" }, { fret: "6" }, { fret: "6" }, { fret: "5" }, { fret: "x" }]

    actual = parse <<~TAB
      A6      xx767x
      Amaj7   5x665x
    TAB

    assert_equal expected, actual
  end

  test "it recognizes chords with 6 string dashed multidigit digit frets" do
    expected = [{ chord: { chord_root: "C#", major_minor: "m", extension_separator: nil, extension_modifier: nil, extension: "7" } }, { fret: "9" }, { fret: "11" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { chord: { chord_root: "F#", major_minor: nil, extension_separator: nil, extension_modifier: nil, extension: "7" } }, { fret: "x" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { fret: "11" }, { chord: { chord_root: "F#", major_minor: nil, extension_separator: nil, extension_modifier: nil, extension: "7" } }, { fret: "x" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { fret: "9" }, { fret: "x" }]

    actual = parse <<~TAB
      C#m7   9-11-9-9-9-9
      F#7    x-9-9-9-9-11
      F#7    x-9-9-9-9-x
    TAB

    assert_equal expected, actual
  end

  test "it parses crossfire.txt's chord section" do
    parse <<~TAB
      A6    xx767x
      Amaj7    5x665x
      Bm7    797777
      C#m7    9-11-9-9-9-9
      C#m7/G#    446454
      C#7sus2    x464444
      Dmaj7    xxx779
      D6    xxx777
      E/B    xx999x
      F#9    x99999
      F#13    x-9-9-9-9-11
      F#m7    242222
    TAB
  end

  def parse(text)
    parsed = @parser.chord_definition_lines.parse(text)
    chorded = @chord_transform.apply(parsed)
    @definition_transform.apply(chorded)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~TAB"
    puts text
    puts "TAB"
    raise
  end
end

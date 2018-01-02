# frozen_string_literal: true
require 'test_helper'

class ChordDefinitionSectionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @transform = ChordDefinitionTransform.new
  end

  test "it recognizes chords with 6 string single digit frets" do
    actual = parse <<~TAB
    A6      xx767x
    Amaj7   5x665x
    TAB
    puts actual
  end

  test "it parses crossfire.txt's chord section" do
    expected = {}
    actual = parse <<~TAB
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
    @transform.apply(parsed)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~TAB"
    puts text
    puts "TAB"
    raise
  end
end

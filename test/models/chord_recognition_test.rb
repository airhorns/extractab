# frozen_string_literal: true
require 'test_helper'

class ChordRecognitionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @transform = ChordTransform.new
  end

  test "it parses major chords with no modifiers" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major), parse_chord("C")
  end

  test "it parses major chords" do
    parse_chord "Cm"
    parse_chord "Cmin"
    parse_chord "Cmaj"
    parse_chord "CM"
    parse_chord "C#"
    parse_chord "C#m"
    parse_chord "C#min"
    parse_chord "C#maj"
    parse_chord "Ab"
    parse_chord "Abm"
    parse_chord "Abmin"
    parse_chord "Abmaj"
  end

  test "it parses extension chords" do
    parse_chord "C7"
    parse_chord "Cm7"
    parse_chord "Cmin7"
    parse_chord "Cmaj7"
    parse_chord "CM7"
    parse_chord "C#7"
    parse_chord "C#m7"
    parse_chord "C#min7"
    parse_chord "C#maj7"
    parse_chord "Ab7"
    parse_chord "Abm7"
    parse_chord "Abmin7"
    parse_chord "Abmaj7"
  end

  test "it parses suspended chords" do
    parse_chord "Cmsus"
    parse_chord "C#msus4"
    parse_chord "Ab13sus4"
    parse_chord "C#msus2"
    parse_chord "Ab13sus2"
  end

  private

  def parse_chord(text)
    parsed = @parser.chord.parse(text)
    return @transform.apply(parsed)
  rescue Parslet::ParseFailed => error
    puts error.parse_failure_cause.ascii_tree
    puts "While parsing <<~CHORD"
    puts text
    puts "CHORD"
    raise
  end
end

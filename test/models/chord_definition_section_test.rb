# frozen_string_literal: true
require 'test_helper'

class ChordDefinitionSectionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @chord_transform = ChordTransform.new
    @definition_transform = ChordDefinitionTransform.new
  end

  test "it recognizes chords with 6 string single digit frets" do
    expected = [
      Music::ChordFretting.new(
        labeled_chord: Music::UnboundChord.for(root: 'A', type: :major_sixth),
        frets: [nil, nil, 7, 6, 7, nil]
      ),
      Music::ChordFretting.new(
        labeled_chord: Music::UnboundChord.for(root: 'A', type: :major_seventh),
        frets: [5, nil, 6, 6, 5, nil]
      ),
    ]

    actual = parse <<~TAB
      A6      xx767x
      Amaj7   5x665x
    TAB

    assert_equal expected, actual
  end

  test "it recognizes chords with 6 string dashed multidigit digit frets" do
    expected = [
      Music::ChordFretting.new(
        labeled_chord: Music::UnboundChord.for(root: 'C#', type: :minor_seventh),
        frets: [9, 11, 9, 9, 9, 9]
      ),
      Music::ChordFretting.new(
        labeled_chord: Music::UnboundChord.for(root: 'F#', type: :dominant_seventh),
        frets: [nil, 9, 9, 9, 9, 11]
      ),
      Music::ChordFretting.new(
        labeled_chord: Music::UnboundChord.for(root: 'F#', type: :dominant_seventh),
        frets: [nil, 9, 9, 9, 9, nil]
      )
    ]

    actual = parse <<~TAB
      C#m7   9-11-9-9-9-9
      F#7    x-9-9-9-9-11
      F#7    x-9-9-9-9-x
    TAB

    assert_equal expected, actual
  end

  test "it parses crossfire.txt's chord section" do
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
      C       x32010
    TAB

    tuning = Music::GuitarTuning::STANDARD
    actual.each do |definition|
      chord = definition.bind_at_tuning(tuning)

      puts "#{definition.labeled_chord.root.symbol}: #{chord.notes_string}"
    end
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

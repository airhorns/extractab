# frozen_string_literal: true
require 'test_helper'

class ChordRecognitionTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
    @transform = ChordTransform.new
  end

  test "it parses major triad chords with no modifiers" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major), parse_chord("C")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major), parse_chord("Gb")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major), parse_chord("F#")
  end

  test "it parses major triad chords with modifiers indicating majorness" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major), parse_chord("CM")
    assert_equal Music::UnboundChord.for(root: 'C', type: :major), parse_chord("Cmaj")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major), parse_chord("GbM")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major), parse_chord("Gbmaj")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major), parse_chord("F#M")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major), parse_chord("F#maj")
  end

  test "it parses minor triad chords" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :minor), parse_chord("Cm")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor), parse_chord("Gbm")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor), parse_chord("F#m")

    assert_equal Music::UnboundChord.for(root: 'C', type: :minor), parse_chord("Cmin")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor), parse_chord("Gbmin")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor), parse_chord("F#min")
  end

  test "it parses major and minor seventh extension chords expressed in the standard way" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major_seventh), parse_chord("Cmaj7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major_seventh), parse_chord("Gbmaj7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major_seventh), parse_chord("F#maj7")

    assert_equal Music::UnboundChord.for(root: 'C', type: :minor_seventh), parse_chord("Cm7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor_seventh), parse_chord("Gbm7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor_seventh), parse_chord("F#m7")

    assert_equal Music::UnboundChord.for(root: 'C', type: :minor_seventh), parse_chord("Cmin7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor_seventh), parse_chord("Gbmin7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor_seventh), parse_chord("F#min7")
  end

  test "it parses dominant seventh chords where the triad is implied major and the seventh is implied minor" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :dominant_seventh), parse_chord("C7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :dominant_seventh), parse_chord("Gb7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :dominant_seventh), parse_chord("F#7")
  end

  test "it parses major seventh extension chords expressed with the add keyword" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major_seventh), parse_chord("Cadd7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major_seventh), parse_chord("Gbadd7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major_seventh), parse_chord("F#add7")
  end

  test "it parses major minor seventh chords expressed with an extension modifier keyword" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :minor_major_seventh), parse_chord("Cmajmin7")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor_major_seventh), parse_chord("Gbmajmin7")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor_major_seventh), parse_chord("F#majmin7")
  end

  test "it parses major sixth extension chords expressed in the standard way" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :major_sixth), parse_chord("Cmaj6")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major_sixth), parse_chord("Gbmaj6")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major_sixth), parse_chord("F#maj6")

    assert_equal Music::UnboundChord.for(root: 'C', type: :major_sixth), parse_chord("C6")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :major_sixth), parse_chord("Gb6")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :major_sixth), parse_chord("F#6")
  end

  test "it parses minor sixth extension chords expressed in the standard way" do
    assert_equal Music::UnboundChord.for(root: 'C', type: :minor_sixth), parse_chord("Cmin6")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor_sixth), parse_chord("Gbmin6")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor_sixth), parse_chord("F#min6")

    assert_equal Music::UnboundChord.for(root: 'C', type: :minor_sixth), parse_chord("Cm6")
    assert_equal Music::UnboundChord.for(root: 'Gb', type: :minor_sixth), parse_chord("Gbm6")
    assert_equal Music::UnboundChord.for(root: 'F#', type: :minor_sixth), parse_chord("F#m6")
  end

  test "it parses suspended chords" do
    parse_chord "Cmsus"
    parse_chord "C#msus4"
    parse_chord "Absus4"
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

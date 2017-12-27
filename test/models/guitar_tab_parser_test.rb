require 'test_helper'

class GuitarTabParserTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
  end

  test "it parses just an intro section" do
    parse <<~TAB
    [Intro]
    TAB

    parse <<~TAB
    [Intro]

    TAB

    parse <<~TAB
    [Intro]


    TAB

    parse <<~TAB

    [Intro]

    TAB


    parse <<~TAB


    [Intro]

    TAB

    parse "\n[Intro]"
    parse "\n\n[Intro]"
  end

  test "it parses multiple sections with headers" do
    parse <<~TAB
    [Intro]
    [Verse]
    [Chorus]
    TAB

    parse <<~TAB

    [Intro]

    [Verse]

    [Chorus]

    TAB

    parse <<~TAB


    [Intro]


    [Verse]


    [Chorus]


    TAB

  end

  test "it parses sections with plain old chords" do
    parse <<~TAB
    [Intro]
    Em Bb Cm
    [Verse]
    Em A Cm
    TAB

    puts parse <<~TAB

    [Intro]
    Em Bb Cm

    [Verse]
    Em A Cm

    TAB

    parse <<~TAB

    [Intro]

    Em Bb Cm


    [Verse]

    Em A Cm

    TAB

  end

  test "it parses major and minor chords" do
    parse_chord "Cm"
    parse_chord "C#m"
    parse_chord "Ab"
    parse_chord "Abm"
  end

  test "it parses extension chords" do
    parse_chord "Cm7"
    parse_chord "C#m11"
    parse_chord "Ab13"
    parse_chord "Cmadd7"
    parse_chord "C#madd11"
    parse_chord "Abadd13"
  end

  test "it parses suspended chords" do
    parse_chord "Cmsus"
    parse_chord "C#msus4"
    parse_chord "Ab13sus4"
    parse_chord "C#msus2"
    parse_chord "Ab13sus2"

  end


  def parse(text)
    begin
      @parser.parse(text)
    rescue Parslet::ParseFailed => error
      puts error.parse_failure_cause.ascii_tree
      puts "While parsing <<~TAB"
      puts text
      puts "TAB"
      raise
    end
  end

  def parse_chord(text)
    begin
      @parser.chord.parse(text)
    rescue Parslet::ParseFailed => error
      puts error.parse_failure_cause.ascii_tree
      puts "While parsing <<~CHORD"
      puts text
      puts "CHORD"
      raise
    end
  end
end

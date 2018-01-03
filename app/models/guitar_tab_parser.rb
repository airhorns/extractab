# frozen_string_literal: true
class GuitarTabParser < Parslet::Parser
  def stri(str)
    key_chars = str.split(//)
    key_chars
      .collect! { |char| match["#{char.upcase}#{char.downcase}"] }
      .reduce(:>>)
  end

  # Utilities
  rule(:eol) { str("\n") }
  rule(:space) { match["\t "] }
  rule(:space?) { space.repeat }
  rule(:empty_line) { space? >> eol }
  rule(:line_char) { (eol.absent? >> any) }

  # Music
  rule(:note) { match['A-G'] >> (str("#") | str("b")).maybe }
  rule(:chord_extension) { str("6") | str("7") | str("9") | str("11") | str("13") }
  rule(:chord) do
    note.as(:chord_root) >>
    (str("min") | str("maj") | str("m") | str("M") | str("-")).maybe.as(:major_minor) >>
    (str("add").maybe.as(:extension_separator) >>
        (str("maj") | str("min") | str("M") | str("m")).maybe.as(:extension_modifier) >>
        chord_extension.as(:extension)
    ).maybe >>
    (str("sus") >> (str("4") | str("2")).maybe).maybe >>
    (str("/") >> note.as(:substitute_root)).maybe
  end

  # Sections
  rule(:fluff) { (stri("tabbed by") >> line_char.repeat >> eol) }

  # Chord definition section, like
  # A6    xx767x
  # Amaj7    5x665x
  rule(:chord_fretting) do
    match['0-9x'].as(:fret).repeat(4, 8) >> eol
  end

  # Or like
  # C#m7    9-11-9-9-9-x
  rule(:dashed_chord_fret) { match['0-9'].repeat(1, 2) | str("x") }
  rule(:dashed_chord_fretting) do
    (dashed_chord_fret.as(:fret) >> str('-')).repeat(4, 7) >> dashed_chord_fret.as(:fret) >> space? >> eol
  end

  rule(:chord_definition_lines) do
    (space? >> chord.as(:chord) >> space? >> (chord_fretting | dashed_chord_fretting).as(:frets)).repeat(1)
  end

  # Lyrics section with chord signals on other lines, like
  # C    Em  Am         F     C   G
  # Wise men say, only fools rush in
  #    F  G    Am    F          C    G   C
  # But I can't help falling in love with you

  rule(:lyric_line) { section_header_signal.absent? >> line_char.repeat(1) >> eol }
  rule(:chord_line) { (chord >> space.repeat(0)).repeat(1) >> eol }
  rule(:chording) do
    # First line can't be empty but other ones can
    (chord_line.as(:chords) | lyric_line.as(:lyrics)) >>
    (empty_line | chord_line.as(:chords) | lyric_line.as(:lyrics)).repeat(0)
  end

  rule(:tab_staff_line) { str('-').repeat(1) >> eol }
  rule(:tab_staff) { tab_staff_line.repeat(1, 8) }

  # Match any characters on lines that aren't empty
  rule(:unrecognized_lines) do
    (
      section_header_signal.absent? >>
      empty_line.absent? >>
      line_char.repeat(1).as(:unrecognized) >> eol
    ).repeat(1)
  end

  # Root
  rule(:section_header_signal) { space? >> str('[') }
  rule(:section_header) do
    space? >>
    str('[') >> (str(']').absent? >> any).repeat(1).as(:header_name) >> str(']') >>
    line_char.repeat(0).as(:header_fluff) >>
    eol
  end

  rule(:section_contents) do
    fluff.as(:fluff_lines) |
    fluff.as(:chord_definition_lines) |
    chording.as(:chord_lines) |
    tab_staff.as(:tab_lines)
  end

  rule(:section) do
    # Sections with a header don't need blank lines to delimit them
    (empty_line.repeat(0) >>
      section_header.as(:header) >>
      empty_line.repeat(0) >>
      section_contents.maybe.as(:contents) >>
      empty_line.repeat(0)
    ) |
    # Sections without a header need a blank line at the end
    (empty_line.repeat(0) >>
      section_contents.maybe.as(:contents) >>
      empty_line.repeat(1)
    ) |
    # Unrecognized sections don't need delimination
    (empty_line.repeat(0) >>
      unrecognized_lines.as(:contents) >>
      empty_line.repeat(0)
    )
  end

  rule(:tab) { section.as(:section).repeat(1) }
  root(:tab)

  def parse(text)
    super("#{text}\n\n")
  end
end

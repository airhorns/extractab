# frozen_string_literal: true
class TabSectionsTransform < Parslet::Transform
  rule(tab: simple(:tab)) do
    tab
  end

  rule(chord_definition: simple(:chord_definition)) do
    chord_definition
  end

  rule(chord: simple(:chord)) do
    chord
  end

  rule(lyric_line: simple(:lyrics)) do
    Tab::LyricLine.new(lyrics)
  end

  rule(chord_line: sequence(:chords)) do
    Tab::ChordLine.new(chords)
  end

  rule(unrecognized_content: simple(:content)) do
    Tab::UnrecognizedContent.new(content)
  end

  rule(title: simple(:title), fluff: sequence(:fluff)) do
    Tab::Header.new(title, fluff.join(''))
  end

  rule(section: { header: subtree(:header), contents: subtree(:contents) }) do
    Tab::Section.new(header, contents)
  end

  rule(section: { contents: subtree(:contents) }) do
    Tab::Section.new(nil, contents)
  end

  rule(sections: sequence(:sections)) do
    Tab::Tab.new(sections)
  end
end

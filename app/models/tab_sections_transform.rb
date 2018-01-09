# frozen_string_literal: true
class TabSectionsTransform < Parslet::Transform
  rule(tab: simple(:tab)) do
    tab
  end

  rule(chord_definition: simple(:chord_definition)) do
    chord_definition
  end

  rule(unrecognized_content: simple(:content)) do
    Tab::UnrecognizedContent.new(content)
  end

  rule(header: { title: simple(:title), fluff: simple(:fluff) }) do
    Tab::Header.new(title, fluff)
  end

  rule(section: { header: subtree(:header), contents: subtree(:contents) }) do
    Tab::Section.new(header, contents)
  end

  rule(section: { contents: subtree(:contents) }) do
    Tab::Section.new(nil, contents)
  end
end

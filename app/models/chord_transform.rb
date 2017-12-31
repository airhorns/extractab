# frozen_string_literal: true
class ChordTransform < Parslet::Transform
  rule(chord_root: simple(:chord_root), major_minor: simple(:major_minor)) do
    root_note = Music::UnboundNote.symbolic(chord_root.to_s)
    Music::UnboundChord.for(root: root_note, type: ChordTransform.chord_type_for_modifiers(major_minor))
  end

  def self.chord_type_for_modifiers(major_minor)
    case major_minor
    when 'm', 'min'
      :minor
    when nil, 'maj', 'M'
      :major
    else
      raise "Couldn't parse chord with major_minor=#{major_minor.inspect}"
    end
  end
end

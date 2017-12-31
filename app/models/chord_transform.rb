# frozen_string_literal: true
class ChordTransform < Parslet::Transform
  rule(chord_root: simple(:chord_root), major_minor: simple(:major_minor)) do
    root_note = Music::UnboundNote.symbolic(chord_root.to_s)
    Music::UnboundChord.for(root: root_note, type: ChordTransform.chord_type_for_modifiers(major_minor))
  end

  rule(
    chord_root: simple(:chord_root),
    major_minor: simple(:major_minor),
    extension: simple(:extension),
    extension_separator: simple(:extension_separator),
    extension_modifier: simple(:extension_modifier)
  ) do
    root_note = Music::UnboundNote.symbolic(chord_root.to_s)
    Music::UnboundChord.for(
      root: root_note,
      type: ChordTransform.chord_type_for_modifiers(major_minor, extension, extension_separator, extension_modifier)
    )
  end


  def self.chord_type_for_modifiers(major_minor, extension=nil, extension_separator=nil, extension_modifier=nil)
    triad = case major_minor
    when 'm', 'min'
      :minor
    when nil, 'maj', 'M'
      :major
    else
      raise "Couldn't parse chord with major_minor=#{major_minor.inspect}"
    end
    return triad if extension.nil?

    raise "Don't support extensions other than the seventh right now, got extension=#{extension.inspect}" unless extension == '7'
    if !extension_separator.nil?
      if extension_separator == 'add'
        return :major_seventh
      else
        raise "Don't support extension words other than add right now, got extension_separator=#{extension_separator.inspect}"
      end
    end

    case extension_modifier
    when nil
      if triad == :major
        :dominant_seventh
      else
        :minor_seventh
      end
    when 'M', 'maj'
      :major_seventh
    when 'm', 'min'
      :minor_seventh
    else
      raise "Couldn't parse chord with extension_modifier=#{extension_modifier.inspect}, extension=#{extension}"
    end
  end
end

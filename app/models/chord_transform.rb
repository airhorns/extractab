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
    third = triad(major_minor)
    return third if extension.nil?

    if !extension_separator.nil?
      if extension_separator == 'add'
        case extension
        when '7'
          return :major_seventh
        when '6'
          return :major_add_6
        else
          raise "Don't support adding extension=#{extension.inspect}"
        end
      else
        raise "Don't support extension words other than add right now, got extension_separator=#{extension_separator.inspect}"
      end
    end

    case extension
    when '7'
      seventh(major_minor, third, extension_modifier)
    when '6'
      sixth(third, extension_modifier)
    else
      raise "Couldn't parse chord with extension_modifier=#{extension_modifier.inspect}, extension=#{extension}"
    end
  end

  def self.triad(major_minor)
    case major_minor
    when 'm', 'min'
      :minor
    when nil, 'maj', 'M'
      :major
    else
      raise "Couldn't parse chord with major_minor=#{major_minor.inspect}"
    end
  end

  def self.sixth(third, extension_modifier)
    case extension_modifier
    when nil
      if third == :major
        :major_sixth
      else
        :minor_sixth
      end
    else
      raise "Couldn't parse sixth chord with extension_modifier=#{extension_modifier.inspect}"
    end

  end

  def self.seventh(major_minor, third, extension_modifier)
    case extension_modifier
    when nil
      if third == :major
        if major_minor.nil?
          :dominant_seventh
        else
          :major_seventh
        end
      else
        :minor_seventh
      end
    when 'm', 'min'
      if third == :major
        :minor_major_seventh
      else
        :minor_seventh
      end
    else
      raise "Couldn't parse seventh chord with extension_modifier=#{extension_modifier.inspect}"
    end
  end
end

# frozen_string_literal: true
class ChordTransform < Parslet::Transform
  rule(chord_root: simple(:chord_root), major_minor: simple(:major_minor)) do
    ChordTransform.chord(
      chord_root: chord_root,
      major_minor: major_minor,
      extension: nil,
      extension_separator: nil,
      extension_modifier: nil,
      substitute_root: nil
    )
  end

  rule(chord_root: simple(:chord_root), major_minor: simple(:major_minor), substitute_root: simple(:substitute_root)) do
    ChordTransform.chord(
      chord_root: chord_root,
      major_minor: major_minor,
      extension: nil,
      extension_separator: nil,
      extension_modifier: nil,
      substitute_root: substitute_root
    )
  end

  rule(
    chord_root: simple(:chord_root),
    major_minor: simple(:major_minor),
    extension: simple(:extension),
    extension_separator: simple(:extension_separator),
    extension_modifier: simple(:extension_modifier)
  ) do
    ChordTransform.chord(
      chord_root: chord_root,
      major_minor: major_minor,
      extension: extension,
      extension_separator: extension_separator,
      extension_modifier: extension_modifier,
      substitute_root: nil
    )
  end

  rule(
    chord_root: simple(:chord_root),
    major_minor: simple(:major_minor),
    extension: simple(:extension),
    extension_separator: simple(:extension_separator),
    extension_modifier: simple(:extension_modifier),
    substitute_root: simple(:substitute_root)
  ) do
    ChordTransform.chord(
      chord_root: chord_root,
      major_minor: major_minor,
      extension: extension,
      extension_separator: extension_separator,
      extension_modifier: extension_modifier,
      substitute_root: substitute_root
    )
  end

  def self.chord(
    chord_root:,
    major_minor:,
    extension:,
    extension_separator:,
    extension_modifier:,
    substitute_root:
  )
    root_note = Music::UnboundNote.symbolic(chord_root.to_s)
    substitute_root = Music::UnboundNote.symbolic(substitute_root.to_s) if substitute_root
    Music::UnboundChord.for(
      root: root_note,
      type: ChordTransform.chord_type_for_modifiers(major_minor, extension, extension_separator, extension_modifier),
      substitute_root: substitute_root
    )
  end

  def self.chord_type_for_modifiers(major_minor, extension = nil, extension_separator = nil, extension_modifier = nil)
    third = triad(major_minor)
    return third if extension.nil?

    seventh = if extension_separator == 'add' || %w(maj M).include?(major_minor)
      :major
    else
      :dominant
    end

    case extension
    when '6'
      sixth(third, extension_modifier)
    when '7'
      seventh(third, seventh, extension_modifier)
    when '9', '11', '13'
      high_extension(third, seventh, extension, extension_modifier)
    else
      raise "Couldn't parse chord with extension_modifier=#{extension_modifier.inspect}, extension=#{extension}"
    end
  end

  def self.triad(major_minor)
    case major_minor
    when 'm', 'min', '-'
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

  def self.seventh(third, seventh, extension_modifier)
    case extension_modifier
    when nil
      if third == :major
        "#{seventh}_seventh".to_sym
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

  def self.high_extension(third, seventh, extension, extension_modifier)
    case extension_modifier
    when nil
      prefix = if third == :major
        if seventh == :dominant
          nil
        else
          :major_
        end
      else
        :minor_
      end
      base = case extension
      when '9' then :ninth
      when '11' then :eleventh
      when '13' then :thirteenth
      end
      "#{prefix}#{base}".to_sym
    else
      raise "Couldn't parse extended #{extension} chord with extension_modifier=#{extension_modifier.inspect}"
    end
  end
end

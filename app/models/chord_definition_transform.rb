# frozen_string_literal: true

class ChordDefinitionTransform < Parslet::Transform
  rule(chord_fret: simple(:fret_number)) do
    case fret_number
    when nil, 'x', 'X'
      nil
    else
      fret_number.to_i
    end
  end

  rule(chord: simple(:chord), frets: sequence(:frets)) do
    Music::ChordFretting.new(labeled_chord: chord, frets: frets)
  end
end

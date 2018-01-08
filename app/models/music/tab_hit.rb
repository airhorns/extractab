# frozen_string_literal: true
module Music
  # Represents an individual pluck of a string shortened to a certain fret along a tab
  class TabHit
    LINKAGES = %i(bend slide slur)

    # Start position is a 0-indexed character position that the hit occured at in the tab
    #  E|---------------------------------|
    #    ^    ^    ^
    #    0th  5th  10th etc
    attr_reader :start_position, :frets, :linkages

    def initialize(start_position, frets, linkages = [])
      raise "Can't have more linkages than frets" if linkages.size > frets.size
      linkages.each { |l| raise "Unrecognized linkage: #{l.inspect} in #{linkages.inspect}" unless LINKAGES.include?(l) }
      @start_position = start_position
      @frets = frets
      @linkages = linkages
    end

    def ==(other)
      if other.class == self.class
        other.start_position == start_position &&
        other.frets == frets &&
        other.linkages == linkages
      end
    end
  end
end

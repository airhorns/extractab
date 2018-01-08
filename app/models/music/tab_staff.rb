# frozen_string_literal: true
module Music
  # Represents a bunch of hits along some strings
  class TabStaff
    String = Struct.new(:tuning, :prefix_length, :hits)

    # Strings are 0-indexed from the top down of the tab
    # 0th ->  e|---------------------------------|
    # 1st ->  B|--------------0-1-0--------------|
    # 2nd ->  G|----------0-2-------2-0----------|
    # etc     D|----0-2-3---------------3-2-0----|
    #         A|--3---------------------------3--|
    #         E|---------------------------------|
    attr_reader :strings

    def initialize(strings)
      raise 'Must be constructed with an array of TabStaff::Strings' unless strings.all? { |s| s.is_a?(TabStaff::String) }
      @strings = strings
    end

    def ==(other)
      if other.class == self.class
        other.strings == strings
      end
    end
    alias_method :eql?, :==
  end
end

# frozen_string_literal: true

class TabStaffTransform < Parslet::Transform
  rule(rest: simple(:rest)) do
    nil
  end

  rule(hit: subtree(:hit)) do
    start_position = hit[0][:tab_fret].line_and_column[1] - 1 # column is 1 indexed for whatever reason, subtract one to make it match the other 0 indexed length calculations
    frets = hit.map { |component| component[:tab_fret].to_i }
    linkages = hit.map { |component| TabStaffTransform.linkage_token_to_linkage(component[:linkage]) }.compact
    Music::TabHit.new(start_position, frets, linkages)
  end

  rule(
    tab_staff_space_prefix: sequence(:space_prefix),
    string_tuning: simple(:string_tuning),
    tab_staff_bar_separator: simple(:tab_bar_separator),
    tab_actions: subtree(:tab_actions)
  ) do
    prefix_length = space_prefix.map(&:size).sum + string_tuning.size + tab_bar_separator.size
    Music::TabStaff::String.new(string_tuning.to_s, prefix_length, tab_actions.compact)
  end

  rule(tab_strings: sequence(:tab_strings)) do
    Music::TabStaff.new(tab_strings.reverse)
  end

  def self.linkage_token_to_linkage(token)
    case token
    when nil
      nil
    when 'h', 'H', 'p', 'P', '^'
      :slur
    when '/'
      :slide
    when 'b', 'B'
      :bend
    else
      raise "Unrecognized linkage token #{token.inspect}"
    end
  end
end

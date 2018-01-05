module DebugHelper
  class DebugSlice
    attr_reader :string, :start_position, :end_position

    def initialize(string, start_position, end_position)
      byebug if string.include?('DebugSlice')
      @string = string
      @start_position = start_position
      @end_position = end_position
    end

    include Comparable
    def <=>(other)
      if other.class == self.class
        start_position <=> other.start_position
      end
    end
  end

  def format_parse_tree(tree, full_input)
    tree = transform_parse_tree(tree, full_input)
    case tree
    when DebugSlice
      tree.string.html_safe
    when Array
      tree.map(&:string).join('').html_safe
    when Hash
      tree.values.map(&:string).join('').html_safea
    else
      raise "Can't format parse tree #{tree.inspect}"
    end
  end

  def transform_parse_tree(tree, full_input)
    case tree
    when Parslet::Slice
      html = format_raw_string(tree)
      DebugSlice.new(html, tree.offset, tree.offset + tree.to_s.length)
    when Hash
      slices = tree.map do |key, value|
        value = transform_parse_tree(value, full_input)
        unless value.nil?
          str = "<span class=\"slice\">
            <span class=\"slice-label\">#{format_raw_string key.to_s}</span>
            #{value.string}
          </span>"
          DebugSlice.new(str, value.start_position, value.end_position)
        end
      end.compact.sort
      fill_in_missing_segments(slices, full_input)
    when Array
      slices = tree.map do |value|
        value = transform_parse_tree(value, full_input)
        unless value.nil?
          str = "<span class=\"slice\">#{value.string}</span>"
          DebugSlice.new(str, value.start_position, value.end_position)
        end
      end.compact.sort
      fill_in_missing_segments(slices, full_input)
    when nil
      nil
    else
      raise "Can't work with tree object #{tree.inspect}"
    end
  end

  def fill_in_missing_segments(slices, full_input)
    if slices.size > 0
      cursor = slices.first.start_position
      strings = slices.inject([]) do |acc, slice|
        if slice.start_position > cursor
          between_slices = full_input.slice(cursor, slice.start_position - cursor)
          acc << "<span class=\"slice unparsed\">#{format_raw_string between_slices}</span>"
        end
        acc << slice.string
        cursor = slice.end_position
        acc
      end
      DebugSlice.new(strings.join("\n"), slices.first.start_position, slices.last.end_position)
    end
  end

  def format_raw_string(string)
    CGI::escapeHTML(string.to_s).gsub("\n", "<br/>")
  end
end

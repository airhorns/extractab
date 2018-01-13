module ParseHelper
  def partial_for_content_type(content)
    case content
    when Music::TabStaff then 'tab_staff_section'
    when Tab::LyricLine then 'lyric_line_section'
    when Tab::ChordLine then 'chord_line_section'
    when Tab::UnrecognizedContent then 'unrecognized_section'
    else raise "Unknown content type #{content.inspect}"
    end
  end
end

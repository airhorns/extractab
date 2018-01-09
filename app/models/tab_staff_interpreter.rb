# frozen_string_literal: true
# Takes the concrete data from a Music::TabStaff (et al) to guess at a tuning and
# a set of real notes for conversion into other formats
class TabStaffInterpreter
  # placeholder for context that might be necessary for interpreting
  attr_reader :context
  def initialize(context = nil)
    @context = context
  end

  def process(tab_staff)
    tuning = inferred_tuning(tab_staff)
    note_index = index_notes_by_position(tab_staff)
  end

  def index_notes_by_position(tab_staff)
  end

  def inferred_tuning
    letters = tab_staff.strings.map(&:tuning).join(' ').upcase
    case letters
    when 'E A D G B E' then Music::GuitarTuning::STANDARD
    when 'D A D G B E' then Music::GuitarTuning::DROP_D
    when 'E A D G' then Music::GuitarTuning::BASS_STANDARD
    else
      # HACK: start in second octave always, which is lame
      octave = 2
      previous_note = UnboundNote.symbolic(tab_staff.strings.first.tuning)
      notes = tab_staff.strings.map do |string|
        letter = string.tuning
        current_note = UnboundNote.symbolic(letter)
        if current_note < previous_note # previous note was higher, we've actually gone up an octave
          octave += 1
        end

        previous_note = current_note
        BoundNote.new("#{letter}#{octave}")
      end

      Music::GuitarTuning.new(strings: notes)
    end
  end
end

# frozen_string_literal: true
module Music
  class BoundChord
    attr_reader :notes

    def initialize(notes)
      raise "Bound chord must be given a group of notes to represent, got #{notes.inspect}" unless notes.all? { |note| note.respond_to?(:note?) && note.note? }
      @notes = notes
    end

    def notes_string
      notes.map(&:symbol).join(' ')
    end

  end
end

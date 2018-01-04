# frozen_string_literal: true

module Music
  # Represents a specific fingering of a chord on a guitar neck with fingers on specific frets.
  # In guitar tabs, we're often given non-standard (interesting!) ways to play chords that are equivalent to
  # the standard (sometimes boring!) chords that match the original artist's sound. This represents which
  # frets to press on which strings. The actual BoundChord that knows exactly which notes are being played
  # in which octaves can be computed with the #bind_at_tuning method, which needs a GuitarTuning to know
  # what the open string notes are.
  class ChordFretting
    class MismatchedStringsException < RenderException; end

    attr_reader :labeled_chord, :frets

    def initialize(labeled_chord:, frets:)
      @labeled_chord = labeled_chord
      @frets = frets
    end

    def ==(other)
      if self.class == other.class
        labeled_chord == other.labeled_chord && frets == other.frets
      end
    end
    alias_method :eql?, :==

    def bind_at_tuning(tuning)
      unless tuning.strings.size == frets.size
        raise MismatchedStringsException, "Can't bind fretting #{inspect} because it has #{frets.size} and the tuning has #{tuning.strings.size} strings"
      end

      notes = tuning.strings.zip(intervals).map! do |open_string, interval|
        if interval
          open_string.apply_interval(interval)
        end
      end.compact!.sort!

      # root = notes.shift
      # chord_intervals = notes.map { |note| Interval.from(root, note) }

      BoundChord.new(notes)
    end

    def intervals
      @frets.map { |semitones| Interval.new(semitones) unless semitones.nil? }
    end
  end
end

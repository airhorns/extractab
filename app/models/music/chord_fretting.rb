# frozen_string_literal: true

module Music
  class ChordFretting
    class MismatchedStringsException < RenderException; end

    attr_reader :labeled_chord, :frets

    def initialize(labeled_chord:, frets:)
      @labeled_chord = labeled_chord
      @frets = frets
    end

    def bind_at_tuning(tuning)
      unless tuning.strings.size == frets.size
        raise MismatchedStringsException, "Can't bind fretting #{inspect} because it has #{frets.size} and the tuning has #{tuning.strings.size} strings"
      end

      notes = tuning.strings.zip(intervals).map! do |open_string, interval|
        if interval
          open_string.apply_interval(interval)
        end
      end.compact!.sort!

      root = notes.shift
      chord_intervals = notes.map { |note| Interval.from(root, note) }

      BoundChord.new(root: notes.min, intervals: chord_intervals)
    end

    def intervals
      @frets.map { |semitones| Interval.new(semitones) unless semitones.nil? }
    end
  end
end

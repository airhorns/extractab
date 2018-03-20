import { TabParser } from "../../guitar_tab";
import { ChordNames, UnboundNote, UnboundChord } from "../../music";
import { MusicMatchers } from "./music_matchers";

describe("Chord Parsing", () => {
  const parser = new TabParser();

  beforeEach(() => {
    jasmine.addMatchers(MusicMatchers);
  });

  it("parses major triad chords with no modifiers", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toBeEquivalent(parser.parseChord("C"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toBeEquivalent(parser.parseChord("Gb"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toBeEquivalent(parser.parseChord("F#"));
  });

  it("parses major triad chords with modifiers indicating majorness", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toBeEquivalent(parser.parseChord("CM"));
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toBeEquivalent(parser.parseChord("Cmaj"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toBeEquivalent(parser.parseChord("GbM"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toBeEquivalent(parser.parseChord("Gbmaj"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toBeEquivalent(parser.parseChord("F#M"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toBeEquivalent(parser.parseChord("F#maj"));
  });

  it("parses minor triad chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("Cm"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("Gbm"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("F#m"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("Cmin"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("Gbmin"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("F#min"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("C-"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("Gb-"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toBeEquivalent(parser.parseChord("F#-"));
  });

  it("parses major and minor seventh extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("Cmaj7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("Gbmaj7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("F#maj7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("Cm7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("Gbm7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("F#m7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("Cmin7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("Gbmin7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("F#min7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("C-7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("Gb-7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toBeEquivalent(parser.parseChord("F#-7"));
  });

  it("parses dominant seventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.DominantSeventh)).toBeEquivalent(parser.parseChord("C7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.DominantSeventh)).toBeEquivalent(parser.parseChord("Gb7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.DominantSeventh)).toBeEquivalent(parser.parseChord("F#7"));
  });

  it("parses major seventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("Cadd7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("Gbadd7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh)).toBeEquivalent(parser.parseChord("F#add7"));
  });

  it("parses major sixth extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("Cmaj6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("Gbmaj6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("F#maj6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("C6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("Gb6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth)).toBeEquivalent(parser.parseChord("F#6"));
  });

  it("parses minor sixth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("Cmin6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("Gbmin6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("F#min6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("Cm6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("Gbm6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("F#m6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("C-6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("Gb-6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toBeEquivalent(parser.parseChord("F#-6"));
  });

  it("parses major and minor ninth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("Cmaj9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("Gbmaj9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("F#maj9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("Cm9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("Gbm9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("F#m9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("Cmin9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("Gbmin9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("F#min9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("C-9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("Gb-9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toBeEquivalent(parser.parseChord("F#-9"));
  });

  it("parses ninth chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Ninth)).toBeEquivalent(parser.parseChord("C9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Ninth)).toBeEquivalent(parser.parseChord("Gb9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Ninth)).toBeEquivalent(parser.parseChord("F#9"));
  });

  it("parses major ninth extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("Cadd9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("Gbadd9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth)).toBeEquivalent(parser.parseChord("F#add9"));
  });

  it("parses major and minor eleventh extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("Cmaj11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("Gbmaj11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("F#maj11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("Cm11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("Gbm11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("F#m11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("Cmin11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("Gbmin11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("F#min11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("C-11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("Gb-11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toBeEquivalent(parser.parseChord("F#-11"));
  });

  it("parses eleventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Eleventh)).toBeEquivalent(parser.parseChord("C11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Eleventh)).toBeEquivalent(parser.parseChord("Gb11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Eleventh)).toBeEquivalent(parser.parseChord("F#11"));
  });

  it("parses major eleventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("Cadd11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("Gbadd11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh)).toBeEquivalent(parser.parseChord("F#add11"));
  });

  it("parses major triad chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major, UnboundNote.fromString("G"))).toBeEquivalent(parser.parseChord("C/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("C"))).toBeEquivalent(parser.parseChord("Gb/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("Bb"))).toBeEquivalent(parser.parseChord("Gb/Bb"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major, UnboundNote.fromString("A#"))).toBeEquivalent(parser.parseChord("F#/A#"));
  });

  it("parses extension chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh, UnboundNote.fromString("G"))).toBeEquivalent(parser.parseChord("Cmaj7/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh, UnboundNote.fromString("C"))).toBeEquivalent(parser.parseChord("Gbm7/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh, UnboundNote.fromString("C#"))).toBeEquivalent(parser.parseChord("F#min7/C#"));
    expect(UnboundChord.forName(UnboundNote.fromString("Db"), ChordNames.DominantSeventh, UnboundNote.fromString("Bb"))).toBeEquivalent(parser.parseChord("Db7/Bb"));
    expect(UnboundChord.forName(UnboundNote.fromString("Eb"), ChordNames.MajorSeventh, UnboundNote.fromString("Db"))).toBeEquivalent(parser.parseChord("Ebadd7/Db"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth, UnboundNote.fromString("G"))).toBeEquivalent(parser.parseChord("Cmaj6/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth, UnboundNote.fromString("C"))).toBeEquivalent(parser.parseChord("Gbm6/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth, UnboundNote.fromString("C#"))).toBeEquivalent(parser.parseChord("F#min6/C#"));
  });

  it("parses suspended chords", () => {
    parser.parseChord("Cmsus");
    parser.parseChord("C#msus4");
    parser.parseChord("Absus4");
  });
});

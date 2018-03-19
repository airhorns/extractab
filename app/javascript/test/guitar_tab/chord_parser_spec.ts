import { TabParser } from "../../guitar_tab";
import { ChordNames, UnboundNote, UnboundChord } from "../../music";

describe("Chord Parsing", () => {
  const parser = new TabParser();

  it("parses major triad chords with no modifiers", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toEqual(parser.parseChord("C"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toEqual(parser.parseChord("Gb"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toEqual(parser.parseChord("F#"));
  });

  it("parses major triad chords with modifiers indicating majorness", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toEqual(parser.parseChord("CM"));
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major)).toEqual(parser.parseChord("Cmaj"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toEqual(parser.parseChord("GbM"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major)).toEqual(parser.parseChord("Gbmaj"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toEqual(parser.parseChord("F#M"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major)).toEqual(parser.parseChord("F#maj"));
  });

  it("parses minor triad chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toEqual(parser.parseChord("Cm"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toEqual(parser.parseChord("Gbm"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toEqual(parser.parseChord("F#m"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toEqual(parser.parseChord("Cmin"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toEqual(parser.parseChord("Gbmin"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toEqual(parser.parseChord("F#min"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor)).toEqual(parser.parseChord("C-"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor)).toEqual(parser.parseChord("Gb-"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor)).toEqual(parser.parseChord("F#-"));
  });

  it("parses major and minor seventh extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("Cmaj7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("Gbmaj7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("F#maj7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("Cm7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("Gbm7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("F#m7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("Cmin7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("Gbmin7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("F#min7"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("C-7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("Gb-7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh)).toEqual(parser.parseChord("F#-7"));
  });

  it("parses dominant seventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.DominantSeventh)).toEqual(parser.parseChord("C7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.DominantSeventh)).toEqual(parser.parseChord("Gb7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.DominantSeventh)).toEqual(parser.parseChord("F#7"));
  });

  it("parses major seventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("Cadd7"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("Gbadd7"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh)).toEqual(parser.parseChord("F#add7"));
  });

  it("parses major sixth extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth)).toEqual(parser.parseChord("Cmaj6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth)).toEqual(parser.parseChord("Gbmaj6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth)).toEqual(parser.parseChord("F#maj6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth)).toEqual(parser.parseChord("C6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth)).toEqual(parser.parseChord("Gb6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth)).toEqual(parser.parseChord("F#6"));
  });

  it("parses minor sixth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toEqual(parser.parseChord("Cmin6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toEqual(parser.parseChord("Gbmin6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toEqual(parser.parseChord("F#min6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toEqual(parser.parseChord("Cm6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toEqual(parser.parseChord("Gbm6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toEqual(parser.parseChord("F#m6"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth)).toEqual(parser.parseChord("C-6"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth)).toEqual(parser.parseChord("Gb-6"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth)).toEqual(parser.parseChord("F#-6"));
  });

  it("parses major and minor ninth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth)).toEqual(parser.parseChord("Cmaj9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth)).toEqual(parser.parseChord("Gbmaj9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth)).toEqual(parser.parseChord("F#maj9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toEqual(parser.parseChord("Cm9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toEqual(parser.parseChord("Gbm9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toEqual(parser.parseChord("F#m9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toEqual(parser.parseChord("Cmin9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toEqual(parser.parseChord("Gbmin9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toEqual(parser.parseChord("F#min9"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth)).toEqual(parser.parseChord("C-9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth)).toEqual(parser.parseChord("Gb-9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth)).toEqual(parser.parseChord("F#-9"));
  });

  it("parses ninth chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Ninth)).toEqual(parser.parseChord("C9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Ninth)).toEqual(parser.parseChord("Gb9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Ninth)).toEqual(parser.parseChord("F#9"));
  });

  it("parses major ninth extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth)).toEqual(parser.parseChord("Cadd9"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth)).toEqual(parser.parseChord("Gbadd9"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth)).toEqual(parser.parseChord("F#add9"));
  });

  it("parses major and minor eleventh extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("Cmaj11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("Gbmaj11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("F#maj11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("Cm11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("Gbm11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("F#m11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("Cmin11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("Gbmin11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("F#min11"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("C-11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("Gb-11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh)).toEqual(parser.parseChord("F#-11"));
  });

  it("parses eleventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Eleventh)).toEqual(parser.parseChord("C11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Eleventh)).toEqual(parser.parseChord("Gb11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Eleventh)).toEqual(parser.parseChord("F#11"));
  });

  it("parses major eleventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("Cadd11"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("Gbadd11"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh)).toEqual(parser.parseChord("F#add11"));
  });

  it("parses major triad chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major, UnboundNote.fromString("G"))).toEqual(parser.parseChord("C/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("C"))).toEqual(parser.parseChord("Gb/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("Bb"))).toEqual(parser.parseChord("Gb/Bb"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major, UnboundNote.fromString("A#"))).toEqual(parser.parseChord("F#/A#"));
  });

  it("parses extension chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh, UnboundNote.fromString("G"))).toEqual(parser.parseChord("Cmaj7/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh, UnboundNote.fromString("C"))).toEqual(parser.parseChord("Gbm7/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh, UnboundNote.fromString("C#"))).toEqual(parser.parseChord("F#min7/C#"));
    expect(UnboundChord.forName(UnboundNote.fromString("Db"), ChordNames.DominantSeventh, UnboundNote.fromString("Bb"))).toEqual(parser.parseChord("Db7/Bb"));
    expect(UnboundChord.forName(UnboundNote.fromString("Eb"), ChordNames.MajorSeventh, UnboundNote.fromString("Db"))).toEqual(parser.parseChord("Ebadd7/Db"));

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth, UnboundNote.fromString("G"))).toEqual(parser.parseChord("Cmaj6/G"));
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth, UnboundNote.fromString("C"))).toEqual(parser.parseChord("Gbm6/C"));
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth, UnboundNote.fromString("C#"))).toEqual(parser.parseChord("F#min6/C#"));
  });

  it("parses suspended chords", () => {
    parser.parseChord("Cmsus");
    parser.parseChord("C#msus4");
    parser.parseChord("Absus4");
  });
});

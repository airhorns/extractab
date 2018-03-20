import { TabParser } from "../../guitar_tab";
import { ChordNames, UnboundNote, UnboundChord } from "../../music";

describe("Chord Parsing", () => {
  const parser = new TabParser();

  it("parses major triad chords with no modifiers", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major).equivalent(parser.parseChord("C"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major).equivalent(parser.parseChord("Gb"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major).equivalent(parser.parseChord("F#"))).toEqual(true);
  });

  it("parses major triad chords with modifiers indicating majorness", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major).equivalent(parser.parseChord("CM"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major).equivalent(parser.parseChord("Cmaj"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major).equivalent(parser.parseChord("GbM"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major).equivalent(parser.parseChord("Gbmaj"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major).equivalent(parser.parseChord("F#M"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major).equivalent(parser.parseChord("F#maj"))).toEqual(true);
  });

  it("parses minor triad chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor).equivalent(parser.parseChord("Cm"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor).equivalent(parser.parseChord("Gbm"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor).equivalent(parser.parseChord("F#m"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor).equivalent(parser.parseChord("Cmin"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor).equivalent(parser.parseChord("Gbmin"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor).equivalent(parser.parseChord("F#min"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Minor).equivalent(parser.parseChord("C-"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Minor).equivalent(parser.parseChord("Gb-"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Minor).equivalent(parser.parseChord("F#-"))).toEqual(true);
  });

  it("parses major and minor seventh extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh).equivalent(parser.parseChord("Cmaj7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh).equivalent(parser.parseChord("Gbmaj7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh).equivalent(parser.parseChord("F#maj7"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh).equivalent(parser.parseChord("Cm7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh).equivalent(parser.parseChord("Gbm7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh).equivalent(parser.parseChord("F#m7"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh).equivalent(parser.parseChord("Cmin7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh).equivalent(parser.parseChord("Gbmin7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh).equivalent(parser.parseChord("F#min7"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSeventh).equivalent(parser.parseChord("C-7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh).equivalent(parser.parseChord("Gb-7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh).equivalent(parser.parseChord("F#-7"))).toEqual(true);
  });

  it("parses dominant seventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.DominantSeventh).equivalent(parser.parseChord("C7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.DominantSeventh).equivalent(parser.parseChord("Gb7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.DominantSeventh).equivalent(parser.parseChord("F#7"))).toEqual(true);
  });

  it("parses major seventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh).equivalent(parser.parseChord("Cadd7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSeventh).equivalent(parser.parseChord("Gbadd7"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSeventh).equivalent(parser.parseChord("F#add7"))).toEqual(true);
  });

  it("parses major sixth extension chords expressed in the standard way", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth).equivalent(parser.parseChord("Cmaj6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth).equivalent(parser.parseChord("Gbmaj6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth).equivalent(parser.parseChord("F#maj6"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth).equivalent(parser.parseChord("C6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorSixth).equivalent(parser.parseChord("Gb6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorSixth).equivalent(parser.parseChord("F#6"))).toEqual(true);
  });

  it("parses minor sixth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth).equivalent(parser.parseChord("Cmin6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth).equivalent(parser.parseChord("Gbmin6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth).equivalent(parser.parseChord("F#min6"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth).equivalent(parser.parseChord("Cm6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth).equivalent(parser.parseChord("Gbm6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth).equivalent(parser.parseChord("F#m6"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorSixth).equivalent(parser.parseChord("C-6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth).equivalent(parser.parseChord("Gb-6"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth).equivalent(parser.parseChord("F#-6"))).toEqual(true);
  });

  it("parses major and minor ninth extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth).equivalent(parser.parseChord("Cmaj9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth).equivalent(parser.parseChord("Gbmaj9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth).equivalent(parser.parseChord("F#maj9"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth).equivalent(parser.parseChord("Cm9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth).equivalent(parser.parseChord("Gbm9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth).equivalent(parser.parseChord("F#m9"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth).equivalent(parser.parseChord("Cmin9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth).equivalent(parser.parseChord("Gbmin9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth).equivalent(parser.parseChord("F#min9"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorNinth).equivalent(parser.parseChord("C-9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorNinth).equivalent(parser.parseChord("Gb-9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorNinth).equivalent(parser.parseChord("F#-9"))).toEqual(true);
  });

  it("parses ninth chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Ninth).equivalent(parser.parseChord("C9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Ninth).equivalent(parser.parseChord("Gb9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Ninth).equivalent(parser.parseChord("F#9"))).toEqual(true);
  });

  it("parses major ninth extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorNinth).equivalent(parser.parseChord("Cadd9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorNinth).equivalent(parser.parseChord("Gbadd9"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorNinth).equivalent(parser.parseChord("F#add9"))).toEqual(true);
  });

  it("parses major and minor eleventh extension chords", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh).equivalent(parser.parseChord("Cmaj11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh).equivalent(parser.parseChord("Gbmaj11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh).equivalent(parser.parseChord("F#maj11"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh).equivalent(parser.parseChord("Cm11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh).equivalent(parser.parseChord("Gbm11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh).equivalent(parser.parseChord("F#m11"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh).equivalent(parser.parseChord("Cmin11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh).equivalent(parser.parseChord("Gbmin11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh).equivalent(parser.parseChord("F#min11"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MinorEleventh).equivalent(parser.parseChord("C-11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorEleventh).equivalent(parser.parseChord("Gb-11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorEleventh).equivalent(parser.parseChord("F#-11"))).toEqual(true);
  });

  it("parses eleventh chords where the triad is implied major and the seventh is implied minor", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Eleventh).equivalent(parser.parseChord("C11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Eleventh).equivalent(parser.parseChord("Gb11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Eleventh).equivalent(parser.parseChord("F#11"))).toEqual(true);
  });

  it("parses major eleventh extension chords expressed with the add keyword", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorEleventh).equivalent(parser.parseChord("Cadd11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MajorEleventh).equivalent(parser.parseChord("Gbadd11"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MajorEleventh).equivalent(parser.parseChord("F#add11"))).toEqual(true);
  });

  it("parses major triad chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.Major, UnboundNote.fromString("G")).equivalent(parser.parseChord("C/G"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("C")).equivalent(parser.parseChord("Gb/C"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.Major, UnboundNote.fromString("Bb")).equivalent(parser.parseChord("Gb/Bb"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.Major, UnboundNote.fromString("A#")).equivalent(parser.parseChord("F#/A#"))).toEqual(true);
  });

  it("parses extension chords with substitute roots", () => {
    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSeventh, UnboundNote.fromString("G")).equivalent(parser.parseChord("Cmaj7/G"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSeventh, UnboundNote.fromString("C")).equivalent(parser.parseChord("Gbm7/C"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSeventh, UnboundNote.fromString("C#")).equivalent(parser.parseChord("F#min7/C#"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Db"), ChordNames.DominantSeventh, UnboundNote.fromString("Bb")).equivalent(parser.parseChord("Db7/Bb"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Eb"), ChordNames.MajorSeventh, UnboundNote.fromString("Db")).equivalent(parser.parseChord("Ebadd7/Db"))).toEqual(true);

    expect(UnboundChord.forName(UnboundNote.fromString("C"), ChordNames.MajorSixth, UnboundNote.fromString("G")).equivalent(parser.parseChord("Cmaj6/G"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("Gb"), ChordNames.MinorSixth, UnboundNote.fromString("C")).equivalent(parser.parseChord("Gbm6/C"))).toEqual(true);
    expect(UnboundChord.forName(UnboundNote.fromString("F#"), ChordNames.MinorSixth, UnboundNote.fromString("C#")).equivalent(parser.parseChord("F#min6/C#"))).toEqual(true);
  });

  it("parses suspended chords", () => {
    parser.parseChord("Cmsus");
    parser.parseChord("C#msus4");
    parser.parseChord("Absus4");
  });
});

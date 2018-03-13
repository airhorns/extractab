import { UnboundNote, Interval, Intervals } from "../../music";

describe("Interval", () => {
  it("different interval instances with the same semitone distance are equal", () => {
    expect(new Interval(0)).toEqual(new Interval(0));
    expect(new Interval(5)).toEqual(new Interval(5));
    expect(Intervals.PerfectFifth).toEqual(Intervals.PerfectFifth);
  });

  it("shoudn't be equal if they go up and down to land on the same letter but not in the same octave, since it wouldn't sound the same", () => {
    const note = UnboundNote.fromString("C");
    const down = new Interval(-5);
    const up = new Interval(7);

    expect(down).not.toEqual(up);
    expect(note.applyInterval(up)).toEqual(note.applyInterval(down));
  });

  it("positive intervals can be inverted to become negative", () => {
    expect(new Interval(0)).toEqual(new Interval(0).invert());
    expect(new Interval(-5)).toEqual(new Interval(7).invert());
    expect(new Interval(-1)).toEqual(new Interval(11).invert());
  });

  it("negative intervals can be inverted to become positive", () => {
    expect(new Interval(5)).toEqual(new Interval(-7).invert());
    expect(new Interval(1)).toEqual(new Interval(-11).invert());
  });

  it("double inversion should lead back to the same interval", () => {
    expect(new Interval(-7)).toEqual(new Interval(-7).invert().invert());
    expect(new Interval(11)).toEqual(new Interval(11).invert().invert());
  });

  it("positive or negative intervals can be forced to positive via positive inversion", () => {
    expect(new Interval(5)).toEqual(new Interval(-7).positiveInversion());
    expect(new Interval(11)).toEqual(new Interval(11).positiveInversion());
  });

  it("should sort intervals from lowest to highest using the sorter", () => {
    const sorted = Object.freeze([new Interval(-2), new Interval(4), new Interval(10), new Interval(100)]);
    expect(sorted.slice(0).sort(Interval.sorter)).toEqual(sorted);
    expect(sorted.slice(0).reverse().sort(Interval.sorter)).toEqual(sorted);
    expect([new Interval(-2), new Interval(100), new Interval(10), new Interval(4)].sort(Interval.sorter)).toEqual(sorted);
  });
});

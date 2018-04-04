import * as ohm from "ohm-js";
import { domainObjectAwareShallowEqual } from "../../extractab/util";
import { UnboundNote, BoundNote } from "../../music";

describe("util", () => {
  const c = BoundNote.fromString("C3");
  const g = BoundNote.fromString("G3");
  const otherC = BoundNote.fromString("C3");
  const unboundC = UnboundNote.fromString("C");

  const interval = (ohm as any).ohmGrammar.source as ohm.Interval;
  const otherInterval = interval.coverageWith();
  const differentInterval = interval.collapsedLeft();

  it("can shallow compare primtives and standard objects", () => {
    expect(domainObjectAwareShallowEqual(1, 1)).toEqual(true);
    expect(domainObjectAwareShallowEqual(1, 2)).toEqual(false);
    expect(domainObjectAwareShallowEqual(true, true)).toEqual(true);
    expect(domainObjectAwareShallowEqual(true, false)).toEqual(false);

    expect(domainObjectAwareShallowEqual({a: true}, {a: true})).toEqual(true);
    expect(domainObjectAwareShallowEqual({a: true}, {a: false})).toEqual(false);
    expect(domainObjectAwareShallowEqual({a: true}, {b: true})).toEqual(false);

    expect(domainObjectAwareShallowEqual({a: true, b: 1}, {a: true, b: 1})).toEqual(true);
    expect(domainObjectAwareShallowEqual({a: true, b: {}}, {a: true, b: 1})).toEqual(false);
    expect(domainObjectAwareShallowEqual({a: true, b: {}}, {a: true, b: {}})).toEqual(false);
  });

  it("can shallow compare domain objects", () => {
    expect(domainObjectAwareShallowEqual(c, c)).toEqual(true);
    expect(domainObjectAwareShallowEqual(c, otherC)).toEqual(true);

    expect(domainObjectAwareShallowEqual(c, 1)).toEqual(false);
    expect(domainObjectAwareShallowEqual(c, {})).toEqual(false);
    expect(domainObjectAwareShallowEqual(c, g)).toEqual(false);
    expect(domainObjectAwareShallowEqual(c, unboundC)).toEqual(false);
  });

  it("can shallow compare objects containing domain objects", () => {
    expect(domainObjectAwareShallowEqual({note: c}, {note: c})).toEqual(true);
    expect(domainObjectAwareShallowEqual({note: c, prop: 1}, {note: c, prop: 1})).toEqual(true);
    expect(domainObjectAwareShallowEqual({note: c}, {note: otherC})).toEqual(true);

    expect(domainObjectAwareShallowEqual({note: c}, {note: 1})).toEqual(false);
    expect(domainObjectAwareShallowEqual({note: c}, {note: c, prop: 1})).toEqual(false);
    expect(domainObjectAwareShallowEqual({note: c}, {note: {}})).toEqual(false);
    expect(domainObjectAwareShallowEqual({note: c}, {note: g})).toEqual(false);
    expect(domainObjectAwareShallowEqual({note: c}, {note: unboundC})).toEqual(false);
  });

  it("can shallow compare objects containing ohm interval objects", () => {
    expect(domainObjectAwareShallowEqual(interval, interval)).toEqual(true);
    expect(domainObjectAwareShallowEqual({interval}, {interval})).toEqual(true);
    expect(domainObjectAwareShallowEqual({interval}, {interval: otherInterval})).toEqual(true);

    expect(domainObjectAwareShallowEqual({interval}, {interval: differentInterval})).toEqual(false);
    expect(domainObjectAwareShallowEqual({interval}, {interval: 1})).toEqual(false);
    expect(domainObjectAwareShallowEqual({interval}, {interval: c})).toEqual(false);
  });
});

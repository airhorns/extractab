/// <reference path="./ohm-util"/>
import * as React from "react";
import * as ohm from "ohm-js";
import * as CodeMirror from "codemirror";

export const intervalToCodemirrorMark = (source: ohm.Interval): [CodeMirror.Position, CodeMirror.Position] => {
  const start = ohm.util.getLineAndColumn(source.sourceString, source.startIdx);
  const end = ohm.util.getLineAndColumn(source.sourceString, source.endIdx);
  return [{line: start.lineNum - 1, ch: start.colNum - 1}, {line: end.lineNum - 1, ch: end.colNum - 1}];
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * modified Object.is polyfill to add .equivalent checks
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
const domainObjectAwareIs = (x: any, y: any) => {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    if (typeof x === "object" && typeof y === "object" && x.constructor === y.constructor) {
      if (typeof x.equivalent === "function") {
        return x.equivalent(y);
      }
      if (hasOwnProperty.call(x, "startIdx") && hasOwnProperty.call(y, "startIdx")) {
        return x.startIdx === y.startIdx && x.endIdx === y.endIdx;
      }
    }

    return x !== x && y !== y;
  }
};

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * If the objects have the same constructor and are part of Extractab such that they
 * how to compare themselves, then use the .equivalent(other) function to compare.
 * Returns true when the values of all keys are strictly equal.
 * Original source lifted from React and modified here.
 */
export const domainObjectAwareShallowEqual = (objA: any, objB: any) => {
  if (domainObjectAwareIs(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) { //tslint:disable-line
    if (!hasOwnProperty.call(objB, keysA[i]) || !domainObjectAwareIs(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

export abstract class DomainAwarePureComponent<P, S> extends React.Component<P, S> {
  public shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>) {
    return !domainObjectAwareShallowEqual(this.props, nextProps) || !domainObjectAwareShallowEqual(this.state, nextState);
  }
}

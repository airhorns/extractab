/// <reference types="jasmine"/>
/// <reference types="karma-jasmine"/>

// tslint:disable
declare namespace jasmine {
  interface Matchers<T> {
    toBeEquivalent(expected: any): boolean;
  }
}
// tslint:enable

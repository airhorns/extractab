export const MusicMatchers: jasmine.CustomMatcherFactories = {
    toBeEquivalent: (util, customEqualityTesters) => {
      return {
        compare: (actual: any, expected: any) => {
          const result = {pass: false, message: "Expected was not .equivalent to actual"};
          if (actual && expected && actual.equivalent && expected.equivalent) {
            result.pass = actual.equivalent(expected);
          }
          return result;
        },
      };
  },
};

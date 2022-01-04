// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava';

type MaybePromise<T> = T | PromiseLike<T>;

type Day<InputOne, InputTwo, ExpectedOne, ExpectedTwo> = {
  partOne(input: InputOne): ExpectedOne;
  partTwo(input: InputTwo): ExpectedTwo;
};

export function createDayMacro<InputOne, InputTwo, ExpectedOne, ExpectedTwo>(
  day: Day<InputOne, InputTwo, ExpectedOne, ExpectedTwo>,
) {
  return {
    partOne: test.macro(
      async (t, input: MaybePromise<InputOne>, expected: ExpectedOne) => {
        t.is(day.partOne(await input), expected);
      },
    ),
    partTwo: test.macro(
      async (t, input: MaybePromise<InputTwo>, expected: ExpectedTwo) => {
        t.is(day.partTwo(await input), expected);
      },
    ),
  };
}

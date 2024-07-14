import { describe, expect, test } from "@jest/globals";
import { formatDate, lastElement, stringOfEightNumbers } from "../../../src/utils/utilFunctions";

describe("lastElement: ", () => {
  const example = [1, 2, 3, 4, undefined, null];

  test("returns a non-null value", () => {
    expect(lastElement(example)).not.toBeNull();
  });

  test("returns a non-undefined value", () => {
    expect(lastElement(example)).not.toBeUndefined();
  });

  test("returns the last element that isn't nullish", () => {
    expect(lastElement(example)).toBe(4);
  });

  test("returns undefined from an empty array", () => {
    expect(lastElement([])).toBeUndefined();
  });
});

describe("formatDate", () => {
  const example = "20021104";
  test("returns a formatted date", () => {
    expect(formatDate(example)).toBe("2002-11-04");
  });
});

describe("stringOfEightNumbers", () => {
  const good = "20021104"
  const bad = "200211rr"
  const longBad = "200211040"
  const shortBad = "2002110"
  const veryBad = 20021104

 test("throws an error on a non-string value", () => {
  // Converting known bad type so TS won't mark it with red all the time
  expect(() => {stringOfEightNumbers(veryBad as unknown as string)}).toThrow(TypeError)
  })

  test("returns false if value includes non-number characters", () => {
    expect(stringOfEightNumbers(bad)).toBe(false)
  })

  test("returns false if value has too many characters", () => {
    expect(stringOfEightNumbers(longBad)).toBe(false)
  })

  test("returns false if value has too few characters", () => {
    expect(stringOfEightNumbers(shortBad)).toBe(false)
  })

  test("returns true if value has exactly 8 numeral characters", () => {
    expect(stringOfEightNumbers(good)).toBe(true)
  })
  

})
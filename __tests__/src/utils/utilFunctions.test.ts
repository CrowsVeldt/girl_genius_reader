import { describe, expect, test } from "@jest/globals";
import { formatDate, lastElement } from "../../../src/utils/utilFunctions";

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

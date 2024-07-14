import { describe, expect, test } from "@jest/globals";
import {
  pageListKey,
  removeData,
  saveData,
  volumeListKey,
} from "../../../src/utils/storage";
import { PageType, VolumeType } from "../../../src/utils/types";
import { checkLists } from "../../../src/utils/lists";

const mockPageData: PageType[] = [
  {
    pageNumber: 1,
    date: "20021104",
    title: "The Streets of Beetleburg",
    volumeNumber: 1,
  },
  { pageNumber: 2, date: "20021106", title: "", volumeNumber: 1 },
  {
    pageNumber: 3,
    date: "20021108",
    title: "Agatha Gets Mugged",
    volumeNumber: 1,
  },
];

const mockVolumeData: VolumeType[] = [
  { volumeStart: "20021104", volumeNumber: 1, pages: mockPageData },
];

describe("checkLists", () => {
  describe("to be true when", () => {
    beforeAll(() => {
      saveData(pageListKey, mockPageData);
      saveData(volumeListKey, mockVolumeData);
    });

    test("both lists are present in memory", async () => {
      expect(await checkLists()).toBe(true);
    });

    afterAll(() => {
      removeData(pageListKey);
      removeData(volumeListKey);
    });
  });
  describe("to be false when", () => {
    beforeAll(() => {
      saveData(pageListKey, mockPageData);
    });

    test("any list is missing from memory", async () => {
      expect(await checkLists()).toBe(false);
    });

    afterAll(() => {
      removeData(pageListKey);
    });
  });
});

import { describe, expect, test } from "@jest/globals";
import { saveData, retrieveData, removeData } from "../../../src/utils/storage";
import { PageType } from "../../../src/utils/types";

// https://dev.to/tiaeastwood/how-to-mock-and-test-asyncstorage-in-react-native-4kil

const bookmarkKey = "bookmarkkey";
const currentPageKey = "currentpagekey";

const mockData: PageType[] = [
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

describe("storage", () => {
  beforeEach(() => {
    saveData(bookmarkKey, mockData);
    saveData(currentPageKey, mockData[2]);
  });

  describe("expect bookmarks", () => {
    let data: PageType[];

    beforeEach(async () => {
      data = await retrieveData(bookmarkKey);
    });

    test("to be truthy", () => {
      expect(data).toBeTruthy();
    });

    test("to match the saved object", () => {
      expect(data).toMatchObject(mockData);
    });

    test("to have 3 elements", () => {
      expect(data.length).toBe(3);
    });

    test("to have first element === mockData[0]", () => {
      expect(data[0]).toStrictEqual({
        pageNumber: 1,
        date: "20021104",
        title: "The Streets of Beetleburg",
        volumeNumber: 1,
      });
    });
  });

  describe("expect current page", () => {
    let data: PageType;
    beforeEach(async () => {
      data = await retrieveData(currentPageKey);
    });

    test("to be truthy", () => {
      expect(data).toBeTruthy();
    });

    test("to be strictly equal to the saved data", () => {
      expect(data).toStrictEqual({
        pageNumber: 3,
        date: "20021108",
        title: "Agatha Gets Mugged",
        volumeNumber: 1,
      });
    });
  });

  describe("removeData", () => {
    beforeEach(() => {
      removeData(currentPageKey);
    });

    test("data should not be found after being removed", async () => {
      expect(await retrieveData(currentPageKey)).toBe(null);
    });

    test("other data should not be effected", async () => {
      expect(await retrieveData(bookmarkKey)).toMatchObject(mockData);
    });
  });
});

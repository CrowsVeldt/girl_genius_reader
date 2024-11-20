import renderer from "react-test-renderer";
import BookmarkLink from "../../../components/link components/BookmarkLink";
import ComicProvider from "../../../src/context/ComicContext";
import { PageType } from "../../../src/utils/types";

describe("<BookmarkLink />", () => {
  const testPage: PageType = {
    date: "20021104",
    title: "",
    pageNumber: 1,
    volumeNumber: 1,
  };

  it("renders the same as last time", () => {
    const tree = renderer.create(
      <ComicProvider>
        <BookmarkLink page={testPage} nav={jest.mock} />
      </ComicProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});

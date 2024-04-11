import renderer from "react-test-renderer";
import BookmarkLink from "../../../src/components/BookmarkLink";
import ComicProvider from "../../../src/context/ComicContext";

describe("<BookmarkLink />", () => {
  const testPage = {
    date: "20021104",
    title: "",
    pageNumber: 1,
    volume: 1,
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

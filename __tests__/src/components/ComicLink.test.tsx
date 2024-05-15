import renderer from "react-test-renderer";
import ComicLink from "../../../src/components/ComicLink";
import ComicProvider from "../../../src/context/ComicContext";

describe("<ComicLink />", () => {
  const testPage = {
    date: "20021104",
    title: "",
    pageNumber: 1,
    volumeNumber: 1,
  };

  it("renders the same as last time", () => {
    const tree = renderer.create(
      <ComicProvider>
        <ComicLink page={testPage} nav={jest.mock} />
      </ComicProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});

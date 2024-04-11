import renderer from "react-test-renderer";
import StarButton from "../../../src/components/StarButton";
import ComicProvider from "../../../src/context/ComicContext";

describe("<StarButton />", () => {
  const testPage = {
    date: "20021104",
    title: "",
    pageNumber: 1,
    volume: 1,
  };

  it("renders the same as last time", () => {
    const tree = renderer.create(
      <ComicProvider>
        <StarButton page={testPage} />
      </ComicProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});

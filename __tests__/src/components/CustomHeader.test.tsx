import renderer from "react-test-renderer";
import ComicLink from "../../../src/components/CustomHeader";
import ComicProvider from "../../../src/context/ComicContext";
import CustomHeader from "../../../src/components/CustomHeader";

describe("<ComicLink />", () => {
  const testPage = {
    date: "20021104",
    title: "",
    pageNumber: 1,
    volume: 1,
  };

  it("renders the same as last time", () => {
    const tree = renderer.create(
      <ComicProvider>
        <CustomHeader
          navigation={jest.mock}
          route={jest.mock}
          options={jest.mock}
          layout={jest.mock}
        />
      </ComicProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});

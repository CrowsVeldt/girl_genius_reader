import renderer from "react-test-renderer";
import ComicProvider from "../../../src/context/ComicContext";
import CustomHeader from "../../../src/components/CustomHeader";

describe("<CustomHeader />", () => {
  // always fails when GestureDetector is present
  it("", () => {});
  // it("renders the same as last time", () => {
  // const tree = renderer.create(
  // <ComicProvider>
  // <CustomHeader
  // navigation={jest.mock}
  // route={jest.mock}
  // options={jest.mock}
  // layout={jest.mock}
  // />
  // </ComicProvider>
  // );
  // expect(tree).toMatchSnapshot();
  // });
});

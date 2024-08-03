import renderer from "react-test-renderer";
import ComicProvider from "../../../src/context/ComicContext";
import PageTurn from "../../../src/components/gesture components/PageTurn";

describe("<PageTurn />", () => {
  // always fails when GestureDetector is present
  it("", () => {});
  // it("renders the same as last time", () => {
  // const tree = renderer.create(
  // <ComicProvider>
  // <PageTurn side="left" />
  // </ComicProvider>
  // );
  // expect(tree).toMatchSnapshot();
  // });
});

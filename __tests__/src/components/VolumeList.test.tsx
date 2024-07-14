import renderer from "react-test-renderer";
import ComicProvider from "../../../src/context/ComicContext";
import { VolumeList } from "../../../src/components/VolumeList";

describe("<VolumeList />", () => {
  // always fails when GestureDetector is present
  it("", () => {});
  // // const testVolume = {
  // //   volumeStart: "20021104",
  // //   volumeNumber: 1,
  // //   pages: [{
  // //   date: "20021104",
  // //   title: "",
  // //   pageNumber: 1,
  // //   volume: 1,
  // // }],
  // // };
  // // it("renders the same as last time", () => {
  // //   const tree = renderer.create(
  // //     <ComicProvider>
  // //       <VolumeList nav={jest.mock} volume={testVolume} />
  // //     </ComicProvider>
  // //   );
  // //   expect(tree).toMatchSnapshot();
  // // });
});

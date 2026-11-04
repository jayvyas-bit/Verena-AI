import { Canvas, Storyboard } from "tempo-sdk/canvas";
import VerenaHomepageStoryboard from "./VerenaHomepageStoryboard";

export default function WebsiteCanvas() {
  return (
    <Canvas name="Website 2.0" backgroundColor="#232323">
      <Storyboard
        id="VerenaHomepageStoryboard"
        name="VerenaHomepage"
        component={VerenaHomepageStoryboard}
        layout={{ x: 0, y: 0, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}

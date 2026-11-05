import { Canvas, Storyboard } from "tempo-sdk/canvas";
import DesktopStoryboard from "./DesktopStoryboard";
import MobileStoryboard from "./MobileStoryboard";

export default function RedesignCanvas() {
  return (
    <Canvas name="5.0 Redesign" backgroundColor="#232323">
      <Storyboard
        id="VerenaRedesignedHeroStoryboard"
        component={DesktopStoryboard}
        layout={{ x: 0, y: 0, width: 1440, height: 1000, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="VerenaRedesignedHeroMobileStoryboard"
        component={MobileStoryboard}
        layout={{ x: 1550, y: 0, width: 390, height: 1450, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}

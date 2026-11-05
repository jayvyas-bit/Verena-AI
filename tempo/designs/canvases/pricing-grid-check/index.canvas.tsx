import { Canvas, Storyboard } from "tempo-sdk/canvas";
import Pricinggridcheck from "./PricingGridCheck";

export default function PricingGridCheckCanvas() {
  return (
    <Canvas name="Pricing Grid Check" backgroundColor="#232323">
      <Storyboard
        id="default"
        name="PricingGridCheck"
        component={Pricinggridcheck}
        layout={{ x: 0, y: 0, width: 1200, height: 900, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}

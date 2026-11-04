import { Canvas, Storyboard } from "tempo-sdk/canvas";
import VerenaHeroInteractive from "./VerenaHeroInteractive";

export default function WebsiteDesignCanvas() {
  return (
    <Canvas name="Website Design" backgroundColor="#232323">
      <Storyboard
        id="VerenaHeroInteractive"
        name="Verena Hero (Interactive)"
        component={VerenaHeroInteractive}
        layout={{ x: 0, y: 0 }}
      />
    </Canvas>
  );
}

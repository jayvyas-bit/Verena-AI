import { Canvas, Storyboard } from "tempo-sdk/canvas";
import VerenaLiveAudit from "../../../../src/components/verena/VerenaLiveAudit";

export default function ComponentRefCanvas() {
  return (
    <Canvas name="3.0" backgroundColor="#232323">
      <Storyboard
        id="VerenaLiveAuditStoryboard"
        name="Verena — Option 3 (The Live Audit)"
        component={VerenaLiveAudit}
        layout={{ x: 0, y: 0, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}

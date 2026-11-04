import { Canvas, Storyboard } from "tempo-sdk/canvas";
import Verenaattioreplica from "../../../../src/components/verena/VerenaAttioReplica";

export default function ComponentRefCanvas() {
  return (
    <Canvas name="4.0" backgroundColor="#232323">
      <Storyboard
        id="VerenaAttioReplicaStoryboard"
        name="Verena — Option 4 (Attio Blueprint Replica)"
        component={Verenaattioreplica}
        layout={{ x: 0, y: 0, width: 600, height: 400, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}

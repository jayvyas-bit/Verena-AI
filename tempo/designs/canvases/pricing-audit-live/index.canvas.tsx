import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";

export default function PricingAuditLiveCanvas() {
  return (
    <Canvas name="Pricing Audit Live" backgroundColor="#232323">
      <RouteStoryboard
        id="PricingDesktop"
        route="https://verena-ai.vercel.app/"
        layout={{ x: 0, y: 0, width: 1440, height: 8000 }}
      />
      <RouteStoryboard
        id="PricingMobile"
        route="https://verena-ai.vercel.app/"
        layout={{ x: 1550, y: 0, width: 390, height: 8700 }}
      />
    </Canvas>
  );
}

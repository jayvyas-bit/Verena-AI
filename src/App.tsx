import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { VerenaHomepage } from "./components/verena/VerenaHomepage";

const VerenaHero = lazy(() =>
  import("./components/verena/VerenaHero").then((m) => ({ default: m.VerenaHero })),
);
const VerenaLedger = lazy(() => import("./components/verena/VerenaLedger"));
const VerenaLiveAudit = lazy(() => import("./components/verena/VerenaLiveAudit"));
const VerenaAttioReplica = lazy(() => import("./components/verena/VerenaAttioReplica"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<VerenaHomepage />} />
        <Route path="/redesign" element={<VerenaHero />} />
        <Route path="/option-2" element={<VerenaLedger />} />
        <Route path="/option-3" element={<VerenaLiveAudit />} />
        <Route path="/option-4" element={<VerenaAttioReplica />} />
        <Route path="/v2" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;

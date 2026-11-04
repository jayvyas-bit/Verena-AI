import { Navigate, Route, Routes } from "react-router-dom";
import { VerenaHero } from "./components/verena/VerenaHero";
import { VerenaHomepage } from "./components/verena/VerenaHomepage";
import VerenaLedger from "./components/verena/VerenaLedger";
import VerenaLiveAudit from "./components/verena/VerenaLiveAudit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VerenaHomepage />} />
      <Route path="/redesign" element={<VerenaHero />} />
      <Route path="/option-2" element={<VerenaLedger />} />
      <Route path="/option-3" element={<VerenaLiveAudit />} />
      <Route path="/v2" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

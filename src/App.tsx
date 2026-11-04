import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { LandingPage } from "./pages/LandingPage";
import { ScanningPage } from "./pages/ScanningPage";
import { ReportPage } from "./pages/ReportPage";
import { VerenaHero } from "./components/verena/VerenaHero";
import { VerenaHomepage } from "./components/verena/VerenaHomepage";

function App() {
  const location = useLocation();
  const isScanning = location.pathname === "/scan";
  const isRedesign = location.pathname === "/redesign" || location.pathname === "/v2";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {!isScanning && !isRedesign && <SiteHeader />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scan" element={<ScanningPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/redesign" element={<VerenaHero />} />
          <Route path="/v2" element={<VerenaHomepage />} />
        </Routes>
      </main>
      {!isScanning && !isRedesign && <SiteFooter />}
    </div>
  );
}

export default App;

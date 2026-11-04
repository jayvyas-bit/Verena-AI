import { Navigate, Route, Routes } from "react-router-dom";
import { VerenaHero } from "./components/verena/VerenaHero";
import { VerenaHomepage } from "./components/verena/VerenaHomepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VerenaHomepage />} />
      <Route path="/redesign" element={<VerenaHero />} />
      <Route path="/v2" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

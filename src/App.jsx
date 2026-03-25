import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CareersPage from "./pages/CareersPage";
import SeasonsPage from "./pages/SeasonsPage";
import MatchesPage from "./pages/MatchesPage";
import Navbar from "./components/Navbar";
import SeasonSummaryPage from "./pages/SeasonSummaryPage";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Hide navbar on login page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:careerId/seasons" element={<SeasonsPage />} />
        <Route path="/seasons/:seasonId/matches" element={<MatchesPage />} />
        <Route path="/seasons/:seasonId/summary" element={<SeasonSummaryPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
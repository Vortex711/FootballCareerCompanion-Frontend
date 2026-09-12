import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "../shared/layout/AppLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import CareersPage from "../features/careers/pages/CareersPage";
import SeasonsPage from "../features/seasons/pages/SeasonsPage";
import MatchesPage from "../features/matches/pages/MatchesPage";
import SeasonSummaryPage from "../features/narratives/pages/SeasonSummaryPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* Application routes */}
        <Route element={<AppLayout />}>

          <Route
            path="/careers"
            element={<CareersPage />}
          />

          <Route
            path="/careers/:careerId/seasons"
            element={<SeasonsPage />}
          />

          <Route
            path="/seasons/:seasonId/matches"
            element={<MatchesPage />}
          />

          <Route
            path="/seasons/:seasonId/summary"
            element={<SeasonSummaryPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
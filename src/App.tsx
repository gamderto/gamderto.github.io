import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import CvPage from "./pages/CvPage";
import ExpeditionsPage from "./pages/ExpeditionsPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/expeditions" element={<ExpeditionsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

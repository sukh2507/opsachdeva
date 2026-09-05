import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BhawansPage from './pages/BhawansPage';
import BhawanDetailPage from './pages/BhawanDetailPage';
import JhankiesPage from './pages/JhankiesPage';
import SingersPage from './pages/SingersPage';

/**
 * App
 * ----
 * Route table. Layout (Navbar/Footer/backdrop) wraps every page.
 * To add a brand-new top-level page, add a <Route> here and a matching
 * link in components/Navbar.jsx and/or data/siteConfig.js CATEGORIES.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/bhawans" element={<BhawansPage />} />
        <Route path="/bhawans/:bhawanId" element={<BhawanDetailPage />} />
        <Route path="/jhankies" element={<JhankiesPage />} />
        <Route path="/singers" element={<SingersPage />} />
      </Route>
    </Routes>
  );
}

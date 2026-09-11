import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const BhawansPage = lazy(() => import('./pages/BhawansPage'));
const BhawanDetailPage = lazy(() => import('./pages/BhawanDetailPage'));
const JhankiesPage = lazy(() => import('./pages/JhankiesPage'));
const SingersPage = lazy(() => import('./pages/SingersPage'));

const PageLoader = () => (
  <div className="min-h-[55vh] flex items-center justify-center text-maroon-700 font-serif text-lg">
    Loading…
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bhawans" element={<BhawansPage />} />
          <Route path="/bhawans/:bhawanId" element={<BhawanDetailPage />} />
          <Route path="/jhankies" element={<JhankiesPage />} />
          <Route path="/singers" element={<SingersPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

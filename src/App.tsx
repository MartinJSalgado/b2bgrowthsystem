import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load all pages for optimal performance
const Landing = lazy(() => import('./pages/Landing'));
const Diagnostic = lazy(() => import('./pages/Diagnostic'));
const MicroOffer = lazy(() => import('./pages/MicroOffer'));
const UltimateGrowthArchitect = lazy(() => import('./pages/UltimateGrowthArchitect'));
const Analyzer = lazy(() => import('./pages/Analyzer'));
const Success = lazy(() => import('./pages/Success'));
const ClarityLab = lazy(() => import('./pages/ClarityLab'));
const SystemIntensive = lazy(() => import('./pages/SystemIntensive'));
const ArchitectureRoadmap = lazy(() => import('./pages/ArchitectureRoadmap'));
const CompleteSystem = lazy(() => import('./pages/CompleteSystem'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#07C1D8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black/60 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/micro-offer" element={<MicroOffer />} />
          <Route path="/ultimate-growth-architect" element={<UltimateGrowthArchitect />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/success" element={<Success />} />
          <Route path="/clarity-lab" element={<ClarityLab />} />
          <Route path="/system-intensive" element={<SystemIntensive />} />
          <Route path="/architecture-roadmap" element={<ArchitectureRoadmap />} />
          <Route path="/complete-system" element={<CompleteSystem />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

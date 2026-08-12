import { useState } from 'react';
import type { VisualizationMode } from './types/biotech';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Innovation } from './components/Innovation';
import { ResearchPipeline } from './components/ResearchPipeline';
import { DockingWorkbench } from './components/DockingWorkbench';
import { Capabilities } from './components/Capabilities';
import { ImpactMetrics } from './components/ImpactMetrics';
import { FinalCTA } from './components/FinalCTA';
import { PartnerModal } from './components/PartnerModal';
import { Footer } from './components/Footer';

export function App() {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  const [mode, setMode] = useState<VisualizationMode>('lattice');
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const handleOpenPartnerModal = () => {
    setPartnerModalOpen(true);
  };

  const handleClosePartnerModal = () => {
    setPartnerModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Navigation Header */}
      <Navigation onOpenPartnerModal={handleOpenPartnerModal} />

      {/* Main Content Experience */}
      <main>
        {/* 1. Hero Section & Interactive Molecular Canvas */}
        <Hero
          mode={mode}
          onModeChange={setMode}
          onOpenPartnerModal={handleOpenPartnerModal}
        />

        {/* 2. Philosophy & Innovation Section */}
        <Innovation />

        {/* 3. 4-Phase Generative Discovery Pipeline */}
        <ResearchPipeline />

        {/* 4. Interactive Science Sandbox: Docking Workbench */}
        <DockingWorkbench />

        {/* 5. Platform Capabilities Grid */}
        <Capabilities />

        {/* 6. Empirical Impact & Metrics */}
        <ImpactMetrics />

        {/* 7. Final Call to Action */}
        <FinalCTA onOpenPartnerModal={handleOpenPartnerModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Partner Access Modal */}
      <PartnerModal isOpen={partnerModalOpen} onClose={handleClosePartnerModal} />
    </div>
  );
}

export default App;

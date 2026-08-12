import React from 'react';
import { motion } from 'framer-motion';
import type { VisualizationMode } from '../types/biotech';
import { MolecularCanvas } from './MolecularCanvas';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  mode: VisualizationMode;
  onModeChange: (mode: VisualizationMode) => void;
  onOpenPartnerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ mode, onModeChange, onOpenPartnerModal }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 flex flex-col justify-center overflow-hidden bg-radial-gradient">
      {/* Background Parametric Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Top Category Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
                Generative Proteomics & Synthesis
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
              Engineering the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent glow-text-cyan">
                Molecular Architecture
              </span>{' '}
              of Life.
            </h1>

            {/* Subheadline Statement */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Valence unifies generative AI deep-learning models with quantum molecular dynamics to program synthetic protein therapeutics at sub-angstrom atomic resolution.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPartnerModal}
                className="group relative px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400" />
                <span className="relative z-10 flex items-center gap-2">
                  Request Platform Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href="#workbench"
                className="px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-200 glass-card hover:text-cyan-300 flex items-center gap-2 transition-all hover:bg-slate-800/60"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                Launch Docking Simulator
              </a>
            </div>

            {/* Key Telemetry Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 font-telemetry uppercase">RECEPTOR AFFINITY</div>
                <div className="text-xl font-bold text-cyan-400 font-telemetry">99.4%</div>
                <div className="text-[10px] text-slate-400">In Silico Precision</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-telemetry uppercase">SCREENED LIGANDS</div>
                <div className="text-xl font-bold text-emerald-400 font-telemetry">14.8M+</div>
                <div className="text-[10px] text-slate-400">De Novo Scaffold Library</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-telemetry uppercase">CRYO-EM RMSD</div>
                <div className="text-xl font-bold text-purple-400 font-telemetry">0.38 Å</div>
                <div className="text-[10px] text-slate-400">Atomic Resolution</div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 w-full"
          >
            <MolecularCanvas mode={mode} onModeChange={onModeChange} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

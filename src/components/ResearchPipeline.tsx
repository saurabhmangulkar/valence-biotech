import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ResearchPhase } from '../types/biotech';
import { Microscope, Terminal } from 'lucide-react';

const PIPELINE_PHASES: ResearchPhase[] = [
  {
    id: 'phase-1',
    step: '01',
    title: 'Generative Proteomics',
    tagline: 'De novo macromolecular scaffold synthesis',
    description: 'Our proprietary deep generative models scan target receptor cryo-EM density maps to design novel, highly specific 3D protein scaffolds from first principles.',
    details: [
      '3D Graph Neural Networks for backbone geometry sampling',
      'Amino acid sequence optimization via energy-minimization algorithms',
      'Allosteric binding site generation with sub-angstrom accuracy',
    ],
    metrics: [
      { label: 'De Novo Scaffolds / Sec', value: '14,200' },
      { label: 'Backbone RMSD Variance', value: '< 0.42 Å' },
    ],
    formula: 'E_{total} = \\sum E_{vdW} + \\sum E_{elec} + \\Delta G_{solv}',
    color: '#00F0FF',
  },
  {
    id: 'phase-2',
    step: '02',
    title: 'Quantum Molecular Dynamics',
    tagline: 'Femtosecond atomic conformation simulation',
    description: 'We execute full quantum mechanics / molecular mechanics (QM/MM) simulations to model electronic polarization and dynamic binding thermodynamics.',
    details: [
      'Explicit solvent molecular dynamics with polarizable force fields',
      'Free energy perturbation (FEP+) calculations for binding affinity',
      'Conformational transition barrier analysis',
    ],
    metrics: [
      { label: 'Simulation Resolution', value: '1.0 Femtosecond' },
      { label: 'Affinity Correlation (R²)', value: '0.94' },
    ],
    formula: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\hat{H} \\Psi(\\mathbf{r}, t)',
    color: '#10B981',
  },
  {
    id: 'phase-3',
    step: '03',
    title: 'Cellular Target Validation',
    tagline: 'Automated microfluidic wet-lab telemetry',
    description: 'Candidates passing in silico filters are automatically synthesized in robotic microfluidic arrays to measure binding kinetics (k_on, k_off) and cellular efficacy.',
    details: [
      'Surface Plasmon Resonance (SPR) real-time binding kinetics',
      'Cryo-EM structural verification of bound complexes',
      'Cellular target engagement assays in human primary cells',
    ],
    metrics: [
      { label: 'Daily Assay Telemetry', value: '2.4 Terabytes' },
      { label: 'Assay Turnaround Time', value: '3.8 Hours' },
    ],
    formula: 'K_D = \\frac{k_{off}}{k_{on}} = 1.4 \\times 10^{-10} \\text{ M}',
    color: '#8B5CF6',
  },
  {
    id: 'phase-4',
    step: '04',
    title: 'Targeted Vector Engineering',
    tagline: 'Tissue-specific delivery & formulation',
    description: 'Optimized protein and RNA payloads are encapsulated into engineered synthetic lipid nanoparticles (LNPs) targeted to specific organ tissue receptors.',
    details: [
      'Ionizable lipid chemistry optimization for cell entry',
      'Organotropic tissue distribution targeting (Liver, Lung, CNS)',
      'In vivo stability & low immunogenicity profiling',
    ],
    metrics: [
      { label: 'Target Cell Selectivity', value: '98.2%' },
      { label: 'Encapsulation Efficiency', value: '96.5%' },
    ],
    formula: '\\text{Selectivity Index} = \\frac{EC_{50}(\\text{Off-Target})}{EC_{50}(\\text{On-Target})}',
    color: '#F43F5E',
  },
];

export const ResearchPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const currentPhase = PIPELINE_PHASES[activeStep];

  return (
    <section id="research" className="py-24 md:py-32 relative bg-[#0B101D] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-telemetry text-cyan-400 mb-4">
              <Microscope className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest">DISCOVERY PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
              The 4-Phase Generative Engine
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            From target cryo-EM map to validated therapeutic candidate in a continuous, automated biological workflow.
          </p>
        </div>

        {/* Pipeline Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {PIPELINE_PHASES.map((phase, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={phase.id}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500/60 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'glass-card hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-telemetry text-xs font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    PHASE {phase.step}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {phase.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Phase Deep-Dive Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-extrabold font-telemetry text-cyan-400">
                  {currentPhase.step}
                </span>
                <div className="h-6 w-px bg-slate-800" />
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {currentPhase.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                {currentPhase.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentPhase.description}
              </p>

              {/* Bullet Details */}
              <div className="space-y-3 pt-2">
                {currentPhase.details.map((detail, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                {currentPhase.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-telemetry">
                    <div className="text-xs text-slate-400 uppercase">{metric.label}</div>
                    <div className="text-xl font-bold text-cyan-300 mt-1">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Formula & Structural Telemetry Widget */}
            <div className="lg:col-span-5 bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 font-telemetry space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  ALGORITHMIC FORMULA
                </span>
                <span className="text-emerald-400 font-mono">LATENCY: 12ms</span>
              </div>

              {/* Formula Render Box */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 text-center font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner">
                <code>{currentPhase.formula}</code>
              </div>

              {/* Animated SVG Diagram Topology */}
              <div className="relative h-40 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
                <svg className="w-full h-full text-cyan-400/40" viewBox="0 0 300 120">
                  <path
                    d="M 10,60 Q 75,10 150,60 T 290,60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <circle cx="75" cy="35" r="6" fill="#00F0FF" className="animate-pulse" />
                  <circle cx="150" cy="60" r="8" fill="#10B981" />
                  <circle cx="225" cy="85" r="6" fill="#8B5CF6" />
                  <line x1="75" y1="35" x2="150" y2="60" stroke="#00F0FF" strokeWidth="1.5" />
                  <line x1="150" y1="60" x2="225" y2="85" stroke="#10B981" strokeWidth="1.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                    REALTIME QM/MM CONFORMATION
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>STATUS: <span className="text-cyan-400 font-semibold">EXECUTING</span></span>
                <span>PIPELINE VER: <span className="text-slate-300">v4.8.2</span></span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

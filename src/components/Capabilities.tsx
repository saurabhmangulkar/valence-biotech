import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CapabilityItem } from '../types/biotech';
import { Layers, X, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    code: 'CAP-01',
    title: 'De Novo Protein Synthesis',
    category: 'Macromolecular Engineering',
    description: 'De novo design of custom tertiary protein folds with sub-angstrom backbone placement tailored to previously untargetable receptor pockets.',
    specs: [
      { label: 'Backbone Diversity', value: '10^14 Folds' },
      { label: 'Fold Thermal Stability (Tm)', value: '> 85°C' },
      { label: 'Solubility Score', value: '98.4%' },
      { label: 'Synthesis Turnaround', value: '48 Hours' },
    ],
    tags: ['Generative AI', 'Proteomics', 'Structural Biology', 'Cryo-EM'],
    highlight: 'Scaffold Generation',
  },
  {
    id: 'cap-2',
    code: 'CAP-02',
    title: 'Allosteric Modulator Discovery',
    category: 'Conformational Control',
    description: 'Identification of dynamic cryptic binding pockets to program highly specific non-competitive allosteric inhibitors and activators.',
    specs: [
      { label: 'Cryptic Pocket Sensitivity', value: '0.2 Å' },
      { label: 'Selectivity Ratio', value: '> 1,000x' },
      { label: 'Conformational Barrier', value: '12.4 kcal/mol' },
      { label: 'Allosteric Index', value: '99.1%' },
    ],
    tags: ['Allostery', 'Cryptic Pockets', 'Dynamics', 'Non-Competitive'],
    highlight: 'Non-Competitive Control',
  },
  {
    id: 'cap-3',
    code: 'CAP-03',
    title: 'Synthetic Biocatalysts & Enzymes',
    category: 'Metabolic Engineering',
    description: 'Quantum-mechanically engineered synthetic enzymes accelerating complex catalytic conversion reactions with high turnover kinetics.',
    specs: [
      { label: 'k_cat / K_m Enhancement', value: '10^8 M⁻¹s⁻¹' },
      { label: 'Thermal Tolerance', value: 'Up to 90°C' },
      { label: 'Enantiomeric Excess', value: '> 99.8%' },
      { label: 'Catalytic Efficiency', value: '99.6%' },
    ],
    tags: ['Enzymology', 'Biocatalysis', 'QM/MM', 'Metabolic AI'],
    highlight: 'Accelerated Catalysis',
  },
  {
    id: 'cap-4',
    code: 'CAP-04',
    title: 'Targeted Epigenetic Regulators',
    category: 'Genomic Modulation',
    description: 'Engineered synthetic transcription factors and chromatin remodeling complexes enabling persistent gene silencing without genomic edits.',
    specs: [
      { label: 'Silencing Persistence', value: '> 6 Months' },
      { label: 'Off-Target Binding', value: '< 0.01%' },
      { label: 'Histone Methylation Rate', value: '94.2%' },
      { label: 'Safety Index', value: '99.9%' },
    ],
    tags: ['Epigenomics', 'Gene Silencing', 'CRISPR-dCas', 'Non-Editing'],
    highlight: 'Reversible Silencing',
  },
  {
    id: 'cap-5',
    code: 'CAP-05',
    title: 'Nanoparticle Vector Formulations',
    category: 'Precision Delivery Systems',
    description: 'Ionizable lipid nanoparticles (LNPs) engineered with organ-specific tropism ligands for cellular payload delivery beyond hepatic tissue.',
    specs: [
      { label: 'Tissue Tropism Efficiency', value: '94.8%' },
      { label: 'Particle Monodispersity (PDI)', value: '< 0.08' },
      { label: 'Payload Encapsulation', value: '96.5%' },
      { label: 'In Vivo Clearance Half-Life', value: '36 Hours' },
    ],
    tags: ['LNP Vectors', 'Tissue Tropism', 'Nanomedicine', 'CNS Delivery'],
    highlight: 'Organ-Targeted Delivery',
  },
  {
    id: 'cap-6',
    code: 'CAP-06',
    title: 'In Silico Safety & Proteome Profiling',
    category: 'Translational Safety',
    description: 'Whole-proteome off-target interaction screening and cardiotoxicity/hERG channel binding prediction prior to wet-lab synthesis.',
    specs: [
      { label: 'Proteome Screening Depth', value: '20,000+ Proteins' },
      { label: 'Safety Prediction AUC', value: '0.96' },
      { label: 'Cardiotoxicity False Negative', value: '< 0.1%' },
      { label: 'FDA Preclinical Compliance', value: '100%' },
    ],
    tags: ['Toxicity Profiling', 'Safety AI', 'hERG Screening', 'FDA Ready'],
    highlight: 'Zero Late-Stage Attrition',
  },
];

export const Capabilities: React.FC = () => {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem | null>(null);

  const openInspector = (cap: CapabilityItem) => {
    sound.playBeep(800, 0.08);
    setSelectedCap(cap);
  };

  const closeInspector = () => {
    sound.playBeep(400, 0.05);
    setSelectedCap(null);
  };

  return (
    <section id="capabilities" className="py-24 md:py-32 relative bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-telemetry text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Precision Macromolecular Modalities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Integrated computational biology solutions engineered for high-value biological targets across oncology, neurology, and rare genetic disease.
          </p>
        </div>

        {/* Capabilities Grid with Hover Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => openInspector(cap)}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Code & Category */}
                <div className="flex items-center justify-between mb-4 font-telemetry text-xs">
                  <span className="text-cyan-400 font-bold bg-cyan-950/70 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {cap.code}
                  </span>
                  <span className="text-slate-500">{cap.category}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              <div>
                {/* Specs Summary */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 font-telemetry text-xs mb-4">
                  {cap.specs.slice(0, 2).map((spec, i) => (
                    <div key={i}>
                      <span className="text-slate-500 block text-[10px] uppercase">{spec.label}</span>
                      <span className="text-slate-200 font-bold text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Inspect Trigger */}
                <div className="flex items-center justify-between text-xs font-telemetry text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>INSPECT TELEMETRY</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Holographic Capability Detail Modal */}
        <AnimatePresence>
          {selectedCap && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeInspector}
                className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 z-10 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={closeInspector}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-telemetry font-bold">
                    {selectedCap.code}
                  </span>
                  <span className="text-xs text-slate-400 font-telemetry">{selectedCap.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
                  {selectedCap.title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  {selectedCap.description}
                </p>

                {/* Deep Specifications Grid */}
                <div className="grid grid-cols-2 gap-4 p-5 bg-slate-950 rounded-2xl border border-slate-800 font-telemetry mb-8">
                  {selectedCap.specs.map((spec, i) => (
                    <div key={i} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 uppercase block mb-1">{spec.label}</span>
                      <span className="text-cyan-300 font-extrabold text-base">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCap.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-telemetry px-3 py-1 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeInspector}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-telemetry uppercase tracking-wider hover:bg-cyan-500/30 transition-colors"
                  >
                    Close Inspector
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

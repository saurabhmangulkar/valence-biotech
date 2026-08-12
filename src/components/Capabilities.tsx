import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { CapabilityItem } from '../types/biotech';
import { Layers } from 'lucide-react';

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    code: 'CAP-01',
    title: 'De Novo Protein Synthesis',
    category: 'Macromolecular Engineering',
    description: 'De novo design of custom tertiary protein folds with sub-angstrom backbone placement tailored to previously targetable target receptors.',
    specs: [
      { label: 'Backbone Diversity', value: '10^14 Folds' },
      { label: 'Fold Stability (Tm)', value: '> 85°C' },
    ],
    tags: ['Generative AI', 'Proteomics', 'Structural Biology'],
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
    ],
    tags: ['Allostery', 'Cryptic Pockets', 'Dynamics'],
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
    ],
    tags: ['Enzymology', 'Biocatalysis', 'QM/MM'],
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
    ],
    tags: ['Epigenomics', 'Gene Silencing', 'CRISPR-dCas'],
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
    ],
    tags: ['LNP Vectors', 'Tissue Tropism', 'Nanomedicine'],
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
    ],
    tags: ['Toxicity Profiling', 'Safety AI', 'hERG Screening'],
    highlight: 'Zero Late-Stage Attrition',
  },
];

export const Capabilities: React.FC = () => {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem | null>(null);

  return (
    <section id="capabilities" className="py-24 md:py-32 relative bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-telemetry text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Precision Molecular Modalities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Integrated computational biology solutions engineered for high-value biological targets across oncology, neurology, and rare genetic disease.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedCap(selectedCap?.id === cap.id ? null : cap)}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4 font-telemetry text-xs">
                  <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/20">
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
                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 font-telemetry text-xs mb-4">
                  {cap.specs.map((spec, i) => (
                    <div key={i}>
                      <span className="text-slate-500 block text-[10px] uppercase">{spec.label}</span>
                      <span className="text-slate-200 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags Footer */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cap.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-telemetry px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

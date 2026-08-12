import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Binary, Cpu, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const Innovation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'valence'>('valence');

  return (
    <section id="philosophy" className="py-24 md:py-32 relative bg-[#06080F]">
      {/* Background Section Lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-telemetry text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="uppercase tracking-widest">SCIENTIFIC PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Biology is the most complex computational substrate in the known universe.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            For decades, drug discovery operated via empirical trial-and-error—screening millions of random molecules hoping for a serendipitous key. Valence replaces trial-and-error with high-dimensional computational protein engineering.
          </p>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Binary className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">
              Quantum Physics & Proteomics
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We do not use simplified steric approximations. Our models compute full electronic structure, hydrogen-bonding networks, and solvent entropy at femtosecond resolution.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-telemetry text-slate-500">
              <span>RESOLUTION</span>
              <span className="text-cyan-400">0.05 Å Grid</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
              Closed-Loop Robotic Telemetry
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              In silico predictions are continuously fed into automated high-throughput microfluidic wet labs, generating 2.4 Terabytes of binding kinetics telemetry daily.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-telemetry text-slate-500">
              <span>FEEDBACK LOOP</span>
              <span className="text-emerald-400">&lt; 4 Hours</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-purple-300 transition-colors">
              Programmable Macromolecules
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              From allosteric switches to synthetic bispecific scaffolds, we construct novel macromolecular architectures never observed in natural biological evolution.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-telemetry text-slate-500">
              <span>SCAFFOLD DIVERSITY</span>
              <span className="text-purple-400">10^14 Variances</span>
            </div>
          </motion.div>

        </div>

        {/* Interactive Paradigm Shift Switcher */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-800/80 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-100">
                The Paradigm Shift: Legacy vs. Valence Engine
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Comparing traditional high-throughput screening against generative computational synthesis.
              </p>
            </div>

            {/* Switcher Controls */}
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('traditional')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'traditional'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Traditional Discovery
              </button>
              <button
                onClick={() => setActiveTab('valence')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'valence'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Valence Engine
              </button>
            </div>
          </div>

          {/* Comparison Body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {activeTab === 'valence' ? (
                <>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-100">De Novo Generative Design</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Synthesizes targeted molecular ligands atom-by-atom matched specifically to target receptor pockets.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-100">4.2x Faster Hit-to-Lead Timeline</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Reduces candidate identification from 4.5 years down to 11 months with zero off-target binding toxicity.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-100">99.4% Multi-Objective Affinity</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Simultaneous optimization for binding affinity, solubility, metabolic stability, and membrane permeability.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-4">
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-300">Random Library Screening</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Relying on legacy chemical libraries with low structural compatibility and high attrition rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-300">4–6 Years Candidate Selection</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Expensive, manual assay cycles with frequent late-stage failure during preclinical validation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base font-bold text-slate-300">High Off-Target Toxicity Risk</h4>
                      <p className="text-sm text-slate-400 mt-0.5">Unpredicted binding interactions causing safety failures in human biological models.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Stat Box Display */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-telemetry space-y-4">
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                BENCHMARK TELEMETRY READOUT
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">AVERAGE DEVELOPMENT TIME</div>
                  <div className={`text-2xl font-bold mt-1 ${activeTab === 'valence' ? 'text-cyan-400' : 'text-rose-400'}`}>
                    {activeTab === 'valence' ? '11 Months' : '4.5 Years'}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">PRECLINICAL SUCCESS RATE</div>
                  <div className={`text-2xl font-bold mt-1 ${activeTab === 'valence' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {activeTab === 'valence' ? '88.6%' : '12.4%'}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                * Based on comparative benchmarks across 120+ synthetic protein target programs.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

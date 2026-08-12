import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { MetricItem } from '../types/biotech';
import { TrendingUp, CheckCircle } from 'lucide-react';

const METRICS: MetricItem[] = [
  {
    id: 'm-1',
    value: 14.8,
    suffix: 'M+',
    label: 'Virtual Compounds Screened',
    subtext: 'High-dimensional proteomic library',
    change: '+140% YOY',
    badge: 'COMPUTATIONAL SCALE',
  },
  {
    id: 'm-2',
    value: 99.4,
    suffix: '%',
    label: 'Affinity Accuracy Precision',
    subtext: 'In silico vs. Cryo-EM experimental fit',
    change: 'Sub-Angstrom Fit',
    badge: 'CRYSTALLOGRAPHY FIT',
  },
  {
    id: 'm-3',
    value: 4.2,
    suffix: 'x',
    label: 'Discovery Velocity Acceleration',
    subtext: 'Target selection to IND filing',
    change: '11 Months Total',
    badge: 'TIMELINE VELOCITY',
  },
  {
    id: 'm-4',
    value: 120,
    prefix: '',
    suffix: '+',
    label: 'Patented Synthetic Scaffolds',
    subtext: 'De novo non-natural protein architectures',
    change: '100% Proprietary',
    badge: 'INTELLECTUAL PROPERTY',
  },
];

export const ImpactMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  // Animated Counter Effect when section comes into view
  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // ms
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(
        METRICS.map((m) => {
          const val = m.value * easeOut;
          return Number(val.toFixed(m.value % 1 === 0 ? 0 : 1));
        })
      );

      if (step >= steps) {
        clearInterval(timer);
        setCounts(METRICS.map((m) => m.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section id="impact" className="py-24 md:py-32 relative bg-[#0B101D] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-telemetry text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">EMPIRICAL IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Quantifiable Discovery Acceleration
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Empirical validation metrics across 120+ active proteomic target programs.
          </p>
        </div>

        {/* Counter Metric Cards */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-slate-800/80 relative overflow-hidden group"
            >
              {/* Badge */}
              <div className="flex items-center justify-between font-telemetry text-[10px] text-slate-500 mb-4 pb-2 border-b border-slate-800/80">
                <span className="text-cyan-400 uppercase font-semibold">{metric.badge}</span>
                <span className="text-emerald-400">{metric.change}</span>
              </div>

              {/* Counter Display */}
              <div className="font-telemetry text-4xl sm:text-5xl font-extrabold text-slate-100 mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                {metric.prefix}
                {counts[idx]}
                {metric.suffix}
              </div>

              <h3 className="text-sm font-bold text-slate-200 mb-1">
                {metric.label}
              </h3>

              <p className="text-xs text-slate-400">
                {metric.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparative Timeline Chart Box */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 font-telemetry">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs text-cyan-400 uppercase font-semibold">DEVELOPMENT TIMELINE BENCHMARK</span>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">From Target Identification to Phase 1 Clinical Entry</h3>
            </div>
            <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              DATASET: 2024-2026 BIOPHARMA AUDIT
            </div>
          </div>

          {/* Timeline Comparison Bars */}
          <div className="space-y-6">
            
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Traditional Biopharma Workflow</span>
                <span className="text-rose-400 font-bold">54 Months (4.5 Years)</span>
              </div>
              <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-rose-500/40 to-rose-500 w-[100%] rounded-full" />
              </div>
            </div>

            {/* Valence Engine Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Valence Generative Engine
                </span>
                <span className="text-cyan-400 font-bold">11 Months (-79% Reduction)</span>
              </div>
              <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 w-[22%] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Target Modeling (2 mo)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-300"></span> De Novo Design (3 mo)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> LNP Formulation (6 mo)</span>
            </div>
            <span className="text-slate-500">Sub-Angstrom Resolution Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
};

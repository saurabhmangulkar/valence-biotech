import React from 'react';
import { ArrowRight, Sparkles, Dna, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenPartnerModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenPartnerModal }) => {
  return (
    <section className="py-28 md:py-36 relative bg-[#06080F] overflow-hidden">
      {/* Background Glow Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-teal-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-telemetry text-cyan-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest">NEXT-GENERATION THERAPEUTICS</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
          The future of medicine is engineered{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent glow-text-cyan">
            cell by cell.
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Unlock sub-angstrom computational proteomics and accelerate candidate selection for your highest priority biological targets.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenPartnerModal}
            className="group relative px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-950 overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] hover:scale-[1.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400" />
            <span className="relative z-10 flex items-center gap-2 font-extrabold">
              Request Partner Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href="#workbench"
            className="px-8 py-4 rounded-2xl font-semibold text-xs uppercase tracking-wider text-slate-200 glass-card hover:text-cyan-300 flex items-center gap-2 transition-all hover:bg-slate-800/60"
          >
            Launch Docking Simulator
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-telemetry text-slate-500 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 27001 & HIPAA Compliant</span>
          <span className="flex items-center gap-1.5"><Dna className="w-4 h-4 text-cyan-400" /> 120+ Active Scaffold Programs</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-400" /> Global Research Hubs (BOS | ZRH | TYO)</span>
        </div>

      </div>
    </section>
  );
};

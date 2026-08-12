import React from 'react';
import { Dna, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04060A] text-slate-400 text-xs border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Dna className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-slate-100 uppercase">
                VALENCE<span className="text-cyan-400 font-mono text-xs ml-1 font-normal">.BIO</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              VALENCE MOLECULAR INC. is a computational biology platform unifying generative AI models with quantum mechanics to design precision protein therapeutics.
            </p>
            <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800/80 font-telemetry text-[11px] text-slate-400 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NETWORK STATUS: <span className="text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span></span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-telemetry text-slate-200 uppercase font-semibold text-xs tracking-wider">PLATFORM</h4>
            <ul className="space-y-2">
              <li><a href="#philosophy" className="hover:text-cyan-400 transition-colors">Philosophy</a></li>
              <li><a href="#research" className="hover:text-cyan-400 transition-colors">4-Phase Pipeline</a></li>
              <li><a href="#workbench" className="hover:text-cyan-400 transition-colors">Docking Simulator</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a></li>
              <li><a href="#impact" className="hover:text-cyan-400 transition-colors">Empirical Impact</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-telemetry text-slate-200 uppercase font-semibold text-xs tracking-wider">RESEARCH NODES</h4>
            <ul className="space-y-2 font-telemetry text-[11px]">
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Boston, MA (HQ)</span>
                <span className="text-slate-500">Kendall Sq Node</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Zürich, Switzerland</span>
                <span className="text-slate-500">ETH Innovation Hub</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Tokyo, Japan</span>
                <span className="text-slate-500">Nihonbashi Bio-Lab</span>
              </li>
            </ul>
          </div>

          {/* Telemetry Readout */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-telemetry text-slate-200 uppercase font-semibold text-xs tracking-wider">SECURITY & COMPLIANCE</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              In silico simulations adhere to strict international regulatory standards for preclinical target modeling and data integrity.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[11px] font-telemetry text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
              <span>256-BIT CRYPTOGRAPHIC SANCTUARY</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 font-telemetry text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VALENCE MOLECULAR INC. All Rights Reserved. Fictional Biotech Platform Demo.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Regulatory Filings</a>
            <a href="#" className="hover:text-slate-300 transition-colors">System Telemetry</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

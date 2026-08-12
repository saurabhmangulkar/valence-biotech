import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenPartnerModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenPartnerModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Research Pipeline', href: '#research' },
    { name: 'Docking Workbench', href: '#workbench' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#06080F]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center overflow-hidden group-hover:border-cyan-400/80 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                <Dna className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-slate-100 uppercase group-hover:text-cyan-300 transition-colors">
                  VALENCE<span className="text-cyan-400 font-mono text-xs ml-1 font-normal">.BIO</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-telemetry">
                  MOLECULAR INTEL
                </span>
              </div>
            </a>

            {/* Live Telemetry Node Badge (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 text-[11px] font-telemetry text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-300">NODE 0.9.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-medium">SYS_NOMINAL</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-cyan-400 transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onOpenPartnerModal}
                className="relative group px-5 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider text-slate-950 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 group-hover:scale-105 transition-transform" />
                <span className="relative z-10 flex items-center font-bold gap-1.5">
                  Partner Access
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#06080F]/95 backdrop-blur-2xl border-b border-slate-800 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs font-telemetry text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYSTEM STATUS:</span>
                <span className="text-emerald-400 font-semibold">100% OPERATIONAL</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/60"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                Partner Access
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

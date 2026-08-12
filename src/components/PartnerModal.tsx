import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Dna, Lock } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    researchArea: 'Oncology',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 z-10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Telemetry Request Transmitted</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  Our computational biology partnership team will verify your research credentials and respond within 24 hours.
                </p>
                <div className="text-xs font-telemetry text-cyan-400 pt-4">
                  ACCESS ID: VALENCE-AUTH-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Dna className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Request Platform Access</h3>
                    <p className="text-xs text-slate-400">VALENCE Generative Therapeutics Portal</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-telemetry text-slate-300 mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Elena Vance"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-telemetry text-slate-300 mb-1">INSTITUTIONAL EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena.vance@stanford.edu"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-telemetry text-slate-300 mb-1">ORGANIZATION</label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Stanford Bio-X"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-telemetry text-slate-300 mb-1">RESEARCH FOCUS</label>
                      <select
                        value={formData.researchArea}
                        onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans"
                      >
                        <option value="Oncology">Oncology</option>
                        <option value="Neurodegeneration">Neurodegeneration</option>
                        <option value="Rare Genetic Disease">Rare Genetic Disease</option>
                        <option value="Synthetic Biology">Synthetic Biology</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-telemetry text-slate-300 mb-1">TARGET PROTEIN BRIEF</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe the target receptor cryo-EM map or molecular pathway..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      256-Bit Encrypted
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] transition-transform"
                    >
                      Transmit Request
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

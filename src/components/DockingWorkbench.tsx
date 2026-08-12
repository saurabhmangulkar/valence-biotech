import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { DockingParameters, DockingMetrics } from '../types/biotech';
import { Sliders, Activity } from 'lucide-react';

export const DockingWorkbench: React.FC = () => {
  const [params, setParams] = useState<DockingParameters>({
    ph: 7.4,
    temperature: 310, // 37°C
    concentration: 50,
    affinity: 85,
    conformation: 'alpha',
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time Physics Calculations
  const metrics: DockingMetrics = useMemo(() => {
    const R = 0.001987; // Gas constant in kcal/(mol*K)
    const kd_nM = Math.max(0.01, 1000 / (params.affinity * (params.ph / 7.4)));
    const kd_M = kd_nM * 1e-9;
    const gibbs = R * params.temperature * Math.log(kd_M);
    const inhibition = kd_nM * 0.85;
    const selectivity = Math.min(99.9, params.affinity * 1.05);
    const score = -Math.log10(kd_M);

    return {
      gibbsEnergy: Number(gibbs.toFixed(2)),
      inhibitionConstant: Number(inhibition.toFixed(2)),
      selectivityIndex: Number(selectivity.toFixed(1)),
      dockingScore: Number(score.toFixed(2)),
    };
  }, [params]);

  // Interactive Live Render of Docking Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const render = () => {
      time += 0.03 * (params.temperature / 300);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Receptor Pocket Base
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.strokeStyle = params.ph < 7.0 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.stroke();

      // Energy Pulse Waves based on Affinity
      const pulseRadius = (time * 40) % 140;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, 1 - pulseRadius / 140)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Ligand Core Node
      const offsetX = Math.sin(time * 2) * (15 - params.affinity * 0.1);
      const offsetY = Math.cos(time * 1.5) * (15 - params.affinity * 0.1);

      ctx.beginPath();
      ctx.arc(centerX + offsetX, centerY + offsetY, 18, 0, Math.PI * 2);
      ctx.fillStyle = params.affinity > 80 ? '#10B981' : '#00F0FF';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 20;
      ctx.fill();

      // Particle Swarm (Concentration effect)
      const pCount = Math.floor(params.concentration / 5);
      for (let i = 0; i < pCount; i++) {
        const angle = i * (Math.PI * 2 / pCount) + time * 0.5;
        const dist = 40 + Math.sin(time + i) * 20;
        const px = centerX + Math.cos(angle) * dist;
        const py = centerY + Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [params]);

  // Preset Configurations
  const applyPreset = (type: 'physiological' | 'acidic' | 'ultrabinder') => {
    if (type === 'physiological') {
      setParams({ ph: 7.4, temperature: 310, concentration: 50, affinity: 85, conformation: 'alpha' });
    } else if (type === 'acidic') {
      setParams({ ph: 6.4, temperature: 315, concentration: 120, affinity: 65, conformation: 'beta' });
    } else {
      setParams({ ph: 7.4, temperature: 305, concentration: 200, affinity: 98, conformation: 'alpha' });
    }
  };

  return (
    <section id="workbench" className="py-24 md:py-32 relative bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-telemetry text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">INTERACTIVE SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Valence Ligand Docking Workbench
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Adjust microenvironment parameters in real time to simulate thermodynamic binding kinetics and Gibbs Free Energy ($\Delta G$).
          </p>
        </div>

        {/* Workbench Interface Container */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-telemetry text-slate-400 uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                ENVIRONMENTAL CONTROLS
              </span>
              
              {/* Presets */}
              <div className="flex items-center space-x-2 text-xs">
                <button
                  onClick={() => applyPreset('physiological')}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Physiological
                </button>
                <button
                  onClick={() => applyPreset('acidic')}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Tumor Acidic
                </button>
                <button
                  onClick={() => applyPreset('ultrabinder')}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Ultra-Binder
                </button>
              </div>
            </div>

            {/* Slider 1: pH */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-telemetry">
                <span className="text-slate-300">pH Microenvironment:</span>
                <span className="text-cyan-400 font-bold">{params.ph.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="8.5"
                step="0.1"
                value={params.ph}
                onChange={(e) => setParams({ ...params, ph: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-telemetry">
                <span>6.0 (Acidic)</span>
                <span>7.4 (Physiological)</span>
                <span>8.5 (Alkaline)</span>
              </div>
            </div>

            {/* Slider 2: Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-telemetry">
                <span className="text-slate-300">Temperature (Kelvin):</span>
                <span className="text-emerald-400 font-bold">{params.temperature} K ({params.temperature - 273}°C)</span>
              </div>
              <input
                type="range"
                min="280"
                max="320"
                step="1"
                value={params.temperature}
                onChange={(e) => setParams({ ...params, temperature: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-telemetry">
                <span>280 K (Hypothermia)</span>
                <span>310 K (37°C Human)</span>
                <span>320 K (Thermal Stress)</span>
              </div>
            </div>

            {/* Slider 3: Ligand Concentration */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-telemetry">
                <span className="text-slate-300">Ligand Concentration:</span>
                <span className="text-purple-400 font-bold">{params.concentration} nM</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={params.concentration}
                onChange={(e) => setParams({ ...params, concentration: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-telemetry">
                <span>5 nM</span>
                <span>250 nM</span>
                <span>500 nM</span>
              </div>
            </div>

            {/* Slider 4: Receptor Target Affinity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-telemetry">
                <span className="text-slate-300">Scaffold Target Affinity:</span>
                <span className="text-cyan-300 font-bold">{params.affinity} / 100</span>
              </div>
              <input
                type="range"
                min="20"
                max="99"
                step="1"
                value={params.affinity}
                onChange={(e) => setParams({ ...params, affinity: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

          </div>

          {/* Right Column: Live Telemetry Metrics & Canvas */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Canvas Docking Pocket */}
            <div className="relative h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute top-3 left-3 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800 text-[11px] font-telemetry text-cyan-400">
                LIGAND DOCKING SIMULATION
              </div>
            </div>

            {/* Calculated Physics Results Grid */}
            <div className="grid grid-cols-2 gap-4 font-telemetry">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase">GIBBS FREE ENERGY ΔG</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {metrics.gibbsEnergy} <span className="text-xs text-slate-400 font-normal">kcal/mol</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase">INHIBITION CONSTANT K_i</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">
                  {metrics.inhibitionConstant} <span className="text-xs text-slate-400 font-normal">nM</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase">SELECTIVITY INDEX</div>
                <div className="text-2xl font-bold text-purple-400 mt-1">
                  {metrics.selectivityIndex} <span className="text-xs text-slate-400 font-normal">%</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase">DOCKING SCORE (pK_d)</div>
                <div className="text-2xl font-bold text-teal-300 mt-1">
                  {metrics.dockingScore}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

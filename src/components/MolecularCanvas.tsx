import React, { useEffect, useRef, useState } from 'react';
import type { VisualizationMode } from '../types/biotech';
import { Cpu, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface MolecularCanvasProps {
  mode: VisualizationMode;
  onModeChange: (mode: VisualizationMode) => void;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  energy: number;
  charge: string;
  connections: number[];
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const MolecularCanvas: React.FC<MolecularCanvasProps> = ({ mode, onModeChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ id: number; charge: string; energy: string } | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [soundOn, setSoundOn] = useState<boolean>(sound.isEnabled());
  const shockwavesRef = useRef<Shockwave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameIdRef = useRef<number | null>(null);

  const toggleAudio = () => {
    const active = sound.toggleSound();
    setSoundOn(active);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node Count & 3D Architecture Generation
    const nodeCount = mode === 'quantum' ? 220 : mode === 'lattice' ? 60 : 40;
    const nodes: Node3D[] = [];
    const radius = Math.min(width, height) * 0.35;

    for (let i = 0; i < nodeCount; i++) {
      let x = 0, y = 0, z = 0;
      let nodeColor = '#00F0FF';
      let nodeRadius = Math.random() * 3.5 + 2;

      if (mode === 'lattice') {
        // DNA Helix / Icosahedral Scaffold
        const t = (i / nodeCount) * Math.PI * 4;
        const strand = i % 2 === 0 ? 1 : -1;
        x = Math.cos(t) * radius * 0.5 * strand;
        y = (i - nodeCount / 2) * 8;
        z = Math.sin(t) * radius * 0.5 * strand;
        nodeColor = strand === 1 ? '#00F0FF' : '#10B981';
      } else if (mode === 'quantum') {
        // Quantum Orbital Electron Cloud
        const r = radius * (0.2 + Math.random() * 0.9);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
        nodeRadius = Math.random() * 2.5 + 1;
        nodeColor = Math.random() > 0.4 ? '#00F0FF' : Math.random() > 0.5 ? '#8B5CF6' : '#3B82F6';
      } else {
        // Ligand Docking Complex (Receptor Pocket + Ligand)
        const isReceptor = i < 28;
        const r = isReceptor ? radius * 0.75 : radius * 0.28;
        const theta = (i / nodeCount) * Math.PI * 2;
        x = r * Math.cos(theta);
        y = r * Math.sin(theta);
        z = (Math.random() - 0.5) * 90;
        nodeColor = isReceptor ? '#38BDF8' : '#F43F5E';
        nodeRadius = isReceptor ? 4 : 5.5;
      }

      // Generate Node Connections
      const connections: number[] = [];
      for (let j = 0; j < i; j++) {
        const dx = x - (nodes[j]?.baseX || 0);
        const dy = y - (nodes[j]?.baseY || 0);
        const dz = z - (nodes[j]?.baseZ || 0);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 0.48 && connections.length < 3) {
          connections.push(j);
        }
      }

      nodes.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        radius: nodeRadius,
        color: nodeColor,
        energy: Math.random() * Math.PI * 2,
        charge: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 1.5).toFixed(2) + 'e',
        connections,
      });
    }

    let lastTime = performance.now();
    let frameCount = 0;
    let angleY = 0;
    let angleX = 0;

    // Render Frame Loop
    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth Mouse Interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      angleY += 0.004 + mouseRef.current.x * 0.00015;
      angleX += 0.002 + mouseRef.current.y * 0.00015;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project Nodes to 2D
      const projectedNodes = nodes.map((node, index) => {
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseZ * cosY + node.baseX * sinY;
        let y1 = node.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.baseY * sinX;

        node.energy += 0.04;
        const pulse = Math.sin(node.energy) * 3;

        const perspective = 550 / (550 + z2);
        const projX = centerX + x1 * perspective;
        const projY = centerY + y1 * perspective;

        return {
          id: index,
          x: projX,
          y: projY,
          z: z2,
          scale: perspective,
          color: node.color,
          radius: node.radius * perspective + pulse * 0.2,
          charge: node.charge,
          energy: (Math.sin(node.energy) * 14 + 86).toFixed(1),
          connections: node.connections,
        };
      });

      projectedNodes.sort((a, b) => b.z - a.z);

      // Render Connection Energy Beams
      for (const node of projectedNodes) {
        for (const targetId of node.connections) {
          const target = projectedNodes.find((n) => n.id === targetId);
          if (target) {
            const alpha = Math.max(0.08, Math.min(0.7, (node.scale - 0.4) * 0.9));
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, target.color);

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.max(0.5, 1.5 * node.scale);
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Render Nodes & Atomic Glow
      let currentHover: { id: number; charge: string; energy: string } | null = null;
      const mouseX = mouseRef.current.targetX + width / 2;
      const mouseY = mouseRef.current.targetY + height / 2;

      for (const node of projectedNodes) {
        const alpha = Math.max(0.25, Math.min(1.0, (node.scale - 0.2) * 1.3));
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHover = dist < node.radius + 10;

        if (isHover) {
          currentHover = { id: node.id, charge: node.charge, energy: `${node.energy} kcal/mol` };
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHover ? node.radius * 2.2 : node.radius, 0, Math.PI * 2);

        ctx.fillStyle = isHover ? '#FFFFFF' : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHover ? 25 : 10;
        ctx.fill();
        ctx.restore();
      }

      setHoveredNode(currentHover);

      // Render Click Shockwave Ripples
      shockwavesRef.current = shockwavesRef.current.filter((sw) => sw.alpha > 0.01);
      for (const sw of shockwavesRef.current) {
        sw.radius += 4;
        sw.alpha *= 0.95;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = sw.alpha;
        ctx.stroke();
        ctx.restore();
      }

      frameIdRef.current = requestAnimationFrame(render);
    };

    frameIdRef.current = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left - width / 2;
      mouseRef.current.targetY = e.clientY - rect.top - height / 2;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      shockwavesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 150,
        alpha: 1.0,
        color: mode === 'quantum' ? '#8B5CF6' : mode === 'lattice' ? '#00F0FF' : '#F43F5E',
      });

      sound.playDockingPulse();
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [mode]);

  return (
    <div className="relative w-full h-[560px] md:h-[660px] rounded-3xl glass-panel overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col justify-between p-4 md:p-6 group">
      
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-telemetry">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-400">REALTIME MODEL:</span>
          <span className="text-cyan-300 font-bold uppercase tracking-wider">{mode} SCENARIO</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors z-20"
            title="Toggle Audio Feedback"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 z-20">
            {(['lattice', 'quantum', 'ligand'] as VisualizationMode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  sound.playBeep(700, 0.05);
                  onModeChange(m);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  mode === m
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {m === 'lattice' ? 'Scaffold Lattice' : m === 'quantum' ? 'Quantum Cloud' : 'Ligand Docking'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas Context */}
      <div className="absolute inset-0 w-full h-full cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-none">
        
        {/* Node Hover Telemetry */}
        <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-xl min-w-[240px] font-telemetry text-xs space-y-1.5 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 font-bold text-slate-200">
              <Cpu className="w-4 h-4 text-cyan-400" /> ATOMIC TELEMETRY
            </span>
            <span className="text-emerald-400 font-bold">{fps} FPS</span>
          </div>
          {hoveredNode ? (
            <div className="space-y-1 pt-1 text-slate-200">
              <div className="flex justify-between"><span>Node Res:</span><span className="text-cyan-300 font-bold">#RES-{hoveredNode.id + 101}</span></div>
              <div className="flex justify-between"><span>Partial Charge:</span><span className="text-purple-400 font-bold">{hoveredNode.charge}</span></div>
              <div className="flex justify-between"><span>Conformation ΔE:</span><span className="text-emerald-400 font-bold">{hoveredNode.energy}</span></div>
            </div>
          ) : (
            <p className="text-slate-500 pt-1 italic text-[11px]">Hover nodes or click canvas to emit kinetic shockwaves...</p>
          )}
        </div>

        {/* Realtime Resolution Chips */}
        <div className="flex items-center space-x-3 font-telemetry text-xs">
          <div className="bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-slate-800 text-slate-300">
            <span className="text-slate-500 block text-[10px] uppercase">RESOLUTION</span>
            <span className="text-cyan-400 font-extrabold text-sm">0.38 Å</span>
          </div>
          <div className="bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-slate-800 text-slate-300">
            <span className="text-slate-500 block text-[10px] uppercase">FREE ENERGY ΔG</span>
            <span className="text-emerald-400 font-extrabold text-sm">-14.2 kcal/mol</span>
          </div>
        </div>

      </div>
    </div>
  );
};

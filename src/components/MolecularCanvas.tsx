import React, { useEffect, useRef, useState } from 'react';
import type { VisualizationMode } from '../types/biotech';
import { Cpu } from 'lucide-react';

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

export const MolecularCanvas: React.FC<MolecularCanvasProps> = ({ mode, onModeChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ id: number; charge: string; energy: string } | null>(null);
  const [fps, setFps] = useState<number>(60);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameIdRef = useRef<number | null>(null);

  // Initialize nodes based on mode
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

    // Generate 3D Node Architecture
    const nodeCount = mode === 'quantum' ? 180 : mode === 'lattice' ? 45 : 32;
    const nodes: Node3D[] = [];
    const radius = Math.min(width, height) * 0.32;

    for (let i = 0; i < nodeCount; i++) {
      let x = 0, y = 0, z = 0;
      let nodeColor = '#00F0FF';
      let nodeRadius = Math.random() * 3 + 2;

      if (mode === 'lattice') {
        // Icosahedral / Alpha helix distribution
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        x = radius * Math.cos(theta) * Math.sin(phi);
        y = radius * Math.sin(theta) * Math.sin(phi);
        z = radius * Math.cos(phi);
        nodeColor = i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#10B981' : '#8B5CF6';
      } else if (mode === 'quantum') {
        // Orbital electron cloud
        const r = radius * (0.3 + Math.random() * 0.9);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
        nodeRadius = Math.random() * 2 + 1;
        nodeColor = Math.random() > 0.4 ? '#00F0FF' : '#3B82F6';
      } else {
        // Ligand-Receptor Docking Pocket (2 main clusters)
        const isReceptor = i < 22;
        const r = isReceptor ? radius * 0.7 : radius * 0.25;
        const offset = isReceptor ? 0 : 40;
        const theta = (i / nodeCount) * Math.PI * 2;
        x = r * Math.cos(theta) + offset;
        y = r * Math.sin(theta);
        z = (Math.random() - 0.5) * 80;
        nodeColor = isReceptor ? '#38BDF8' : '#F43F5E';
        nodeRadius = isReceptor ? 4 : 5;
      }

      // Generate connections for lattice
      const connections: number[] = [];
      if (mode === 'lattice' || mode === 'ligand') {
        for (let j = 0; j < i; j++) {
          const dx = x - (nodes[j]?.baseX || 0);
          const dy = y - (nodes[j]?.baseY || 0);
          const dz = z - (nodes[j]?.baseZ || 0);
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < radius * 0.55 && connections.length < 3) {
            connections.push(j);
          }
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

    // Main Render Loop
    const render = (time: number) => {
      // FPS calculation
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth Mouse Interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      angleY += 0.003 + mouseRef.current.x * 0.0002;
      angleX += 0.001 + mouseRef.current.y * 0.0002;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D to 2D
      const projectedNodes = nodes.map((node, index) => {
        // Rotate Y
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseZ * cosY + node.baseX * sinY;
        // Rotate X
        let y1 = node.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.baseY * sinX;

        // Pulse wave effect
        node.energy += 0.03;
        const pulse = Math.sin(node.energy) * 3;

        // Perspective scale factor
        const perspective = 500 / (500 + z2);
        const projX = centerX + x1 * perspective;
        const projY = centerY + y1 * perspective;

        return {
          id: index,
          x: projX,
          y: projY,
          z: z2,
          scale: perspective,
          color: node.color,
          radius: node.radius * perspective + (mode === 'quantum' ? pulse * 0.2 : 0),
          charge: node.charge,
          energy: (Math.sin(node.energy) * 12.5 + 85).toFixed(1),
          connections: node.connections,
        };
      });

      // Sort by Z for proper depth ordering
      projectedNodes.sort((a, b) => b.z - a.z);

      // Draw Connection Bonds
      ctx.lineWidth = 1;
      for (const node of projectedNodes) {
        for (const targetId of node.connections) {
          const target = projectedNodes.find(n => n.id === targetId);
          if (target) {
            const alpha = Math.max(0.05, Math.min(0.6, (node.scale - 0.5) * 0.8));
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, target.color);

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw Nodes & Glow
      let currentHover: { id: number; charge: string; energy: string } | null = null;
      const mouseX = mouseRef.current.targetX + width / 2;
      const mouseY = mouseRef.current.targetY + height / 2;

      for (const node of projectedNodes) {
        const alpha = Math.max(0.2, Math.min(1.0, (node.scale - 0.3) * 1.2));
        
        // Hover Detection
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHover = dist < node.radius + 8;

        if (isHover) {
          currentHover = { id: node.id, charge: node.charge, energy: `${node.energy} kcal/mol` };
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHover ? node.radius * 1.8 : node.radius, 0, Math.PI * 2);
        
        // Radial Glow
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * (isHover ? 4 : 2.5)
        );
        glow.addColorStop(0, node.color);
        glow.addColorStop(1, 'transparent');

        ctx.fillStyle = isHover ? '#FFFFFF' : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHover ? 20 : 8;
        ctx.fill();

        ctx.restore();
      }

      setHoveredNode(currentHover);

      // Mode-Specific Orbital Rings
      if (mode === 'lattice' || mode === 'ligand') {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angleY * 0.5);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.1, radius * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 12]);
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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode]);

  return (
    <div className="relative w-full h-[540px] md:h-[640px] rounded-2xl glass-panel overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between p-4 md:p-6 group">
      {/* Top Telemetry Overlay */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-telemetry">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-slate-400">REALTIME MODEL:</span>
          <span className="text-cyan-300 font-semibold uppercase tracking-wider">{mode} SYSTEM</span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80 z-20">
          {(['lattice', 'quantum', 'ligand'] as VisualizationMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                mode === m
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {m === 'lattice' ? 'Scaffold Lattice' : m === 'quantum' ? 'Quantum Cloud' : 'Ligand Docking'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Context */}
      <div className="absolute inset-0 w-full h-full cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-none">
        {/* Node Hover Telemetry Specs */}
        <div className="bg-slate-950/90 border border-slate-800/80 p-3 rounded-xl backdrop-blur-md min-w-[220px] font-telemetry text-xs space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> ATOMIC TELEMETRY</span>
            <span className="text-emerald-400">{fps} FPS</span>
          </div>
          {hoveredNode ? (
            <div className="space-y-0.5 pt-1 text-slate-200">
              <div className="flex justify-between"><span>Node ID:</span><span className="text-cyan-300">#RES-{hoveredNode.id + 101}</span></div>
              <div className="flex justify-between"><span>Partial Charge:</span><span className="text-purple-400">{hoveredNode.charge}</span></div>
              <div className="flex justify-between"><span>Conformation Energy:</span><span className="text-emerald-400">{hoveredNode.energy}</span></div>
            </div>
          ) : (
            <p className="text-slate-500 pt-1 italic text-[11px]">Hover over molecular nodes to inspect atomic state...</p>
          )}
        </div>

        {/* Realtime Structural Stat Chips */}
        <div className="flex items-center space-x-3 font-telemetry text-xs">
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
            <span className="text-slate-500 block text-[10px]">RMSD RESOLUTION</span>
            <span className="text-cyan-400 font-semibold">0.38 Å</span>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
            <span className="text-slate-500 block text-[10px]">GIBBS FREE ENERGY ΔG</span>
            <span className="text-emerald-400 font-semibold">-14.2 kcal/mol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

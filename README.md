# VALENCE MOLECULAR — Next-Gen Computational Biology Platform

> **Decoding Cellular Intelligence** — An Awwwards-grade, highly interactive, animation-driven biotechnology landing page designed for computational proteomics and synthetic therapeutics discovery.

---

## 🧬 Project Overview

**VALENCE MOLECULAR** is an original digital experience built for a fictional next-generation biotechnology company operating at the intersection of **AI-driven deep learning, quantum molecular dynamics, and synthetic biology**. 

Rather than relying on stock templates or generic SaaS layouts, VALENCE delivers a continuous cinematic visual narrative featuring real-time 3D/Canvas atomic particle graphics, interactive ligand docking workbench simulations, scroll-driven telemetry, and refined micro-interactions.

---

## 🎨 Creative Direction & Brand Identity

- **Company Name**: VALENCE MOLECULAR INC.
- **Tagline**: *Decoding Cellular Intelligence*
- **Visual Aesthetic**: Sub-angstrom obsidian slate (`#06080F`), bioluminescent cyan (`#00F0FF`), electric mint (`#10B981`), quantum violet (`#8B5CF6`), and translucent glassmorphic HUD telemetry cards.
- **Typography System**: 
  - Display & Body: `Plus Jakarta Sans` / `Inter`
  - Telemetry & Physics Data: `JetBrains Mono`

---

## ⚡ Core Features & Interactive Elements

1. **Interactive Molecular Visual (WebGL / 2D-3D Canvas)**
   - Custom 3D particle node physics engine featuring 3 real-time visualization modes:
     - **Scaffold Lattice**: Alpha-helix 3D amino acid node network with pulse wave propagation.
     - **Quantum Cloud**: Bioluminescent electron density cloud with 180+ orbiting nodes.
     - **Ligand Docking**: Receptor pocket docking complex with dynamic energy wave pulses.
   - Interactive mouse gravity & rotation, real-time FPS readout, and atomic node hover inspection.

2. **Interactive Science Sandbox: Ligand Docking Workbench**
   - Live interactive parameters: pH Microenvironment, Temperature (K), Ligand Concentration (nM), Target Receptor Affinity.
   - Real-time thermodynamic physics calculations ($\Delta G$ Gibbs Free Energy, $K_i$ Inhibition Constant, Selectivity Index %, $pK_d$ Docking Score).
   - Real-time animated canvas reacting dynamically to slider shifts.

3. **4-Phase Generative Discovery Pipeline**
   - Interactive 4-step workflow: *Generative Proteomics → Quantum Dynamics → Cellular Validation → Vector Engineering*.
   - Live algorithmic formula readouts and topological network diagrams.

4. **Paradigm Shift Matrix**
   - Interactive comparison tool comparing traditional biopharma trial-and-error against the Valence generative engine.

5. **Scroll-Triggered Telemetry & Metrics**
   - Smooth animated counters for 14.8M+ Screened Ligands, 99.4% Affinity Precision, 4.2x Velocity, and 120+ Scaffolds.
   - Interactive timeline benchmark comparing historical candidate timelines against Valence.

6. **Interactive Partner Access Modal**
   - Encrypted access request form with real-time feedback and state handling.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism CSS Utilities
- **Animations & Micro-interactions**: Framer Motion
- **3D & Procedural Canvas**: Custom HTML5 2D/3D Math Engine with Three.js compatibility
- **Smooth Scroll**: Lenis (`lenis`)
- **Icons**: `lucide-react`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine.
- `npm` package manager.

### Installation

```bash
# Clone or navigate to project directory
cd valence-biotech

# Install dependencies
npm install
```

### Local Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To verify TypeScript compilation and create an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ♿ Accessibility & Performance Optimizations

- **`prefers-reduced-motion` Support**: Automatically simplifies or disables canvas animations and scroll transitions for users with reduced motion settings enabled.
- **Hardware Acceleration**: Canvas rendering utilizes sub-pixel positioning, frame-budgeting, and requestAnimationFrame cleanups to maintain 60 FPS across desktop, tablet, and mobile devices.
- **Semantic Structure**: Accessible ARIA roles, high contrast text ratios, clean heading hierarchy (`h1` → `h3`), and keyboard focus rings.

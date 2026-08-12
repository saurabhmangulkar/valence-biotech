export type VisualizationMode = 'lattice' | 'quantum' | 'ligand';

export interface ResearchPhase {
  id: string;
  step: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  formula: string;
  color: string;
}

export interface CapabilityItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
  highlight: string;
}

export interface MetricItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
  change: string;
  badge: string;
}

export interface DockingParameters {
  ph: number;
  temperature: number; // in Kelvin
  concentration: number; // in nM
  affinity: number; // 0-100 scale
  conformation: 'alpha' | 'beta' | 'loop';
}

export interface DockingMetrics {
  gibbsEnergy: number; // kcal/mol
  inhibitionConstant: number; // nM
  selectivityIndex: number; // 0-100
  dockingScore: number; // pKd
}

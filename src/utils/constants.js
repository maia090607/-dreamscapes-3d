export const WORLD_RANGES = [
  { id: 'dreamscape', label: 'Lucid Dream', subtitle: 'Ethereal · Warm · Fluid', start: 0, end: 0.16 },
  { id: 'neon', label: 'Neon Pulse', subtitle: 'Cyber · Electric · Sharp', start: 0.2, end: 0.55 },
  { id: 'cosmic', label: 'Cosmic Veil', subtitle: 'Infinite · Mystic · Deep', start: 0.6, end: 1 },
]

export const PALETTES = {
  dreamscape: {
    primary: '#ff6b9d',
    secondary: '#ffd166',
    accent: '#ff8fab',
    glow: '#f472b6',
    ambient: '#332211',
    directional: '#ff8fab',
  },
  neon: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#00ff88',
    glow: '#ff6600',
    ambient: '#0a0a2e',
    directional: '#00ffff',
  },
  cosmic: {
    primary: '#7b2ff7',
    secondary: '#a855f7',
    accent: '#c084fc',
    glow: '#e0aaff',
    ambient: '#1a0a2e',
    directional: '#a855f7',
  },
}

export const CAMERA_POINTS = [
  [0, 1.5, 5],
  [1.5, 2, 4.5],
  [3.5, 2.8, 4],
  [7, 2.5, 4.5],
  [11, 2.2, 4],
  [14, 2, 4],
  [16, 2, 4.5],
  [18, 2.5, 4],
  [20, 2.2, 3.5],
  [21, 2.8, 6],
  [22, 3.8, 9],
  [23, 5.5, 13],
  [24, 7.5, 18],
  [25, 9.5, 23],
  [26, 11, 28],
]

export const LOOK_POINTS = [
  [0, 0.2, 0],
  [2, 0.4, 0],
  [5, 0, 0],
  [9, 0.3, 0],
  [13, 0.1, 0],
  [15, 0.1, 0],
  [16, 0.1, 0],
  [18, 0.3, 0],
  [20, 0.2, 0],
  [21, 0.3, 0],
  [22, 0.4, 0],
  [23, 0.5, 0],
  [24, 0.5, 0],
  [25, 0.5, 0],
  [26, 0.5, 0],
]

export const TECHNOLOGIES = [
  { name: 'React Three Fiber', category: 'Framework' },
  { name: 'Three.js', category: 'Engine' },
  { name: 'React Three Drei', category: 'Utilities' },
  { name: 'Postprocessing', category: 'Effects' },
  { name: 'WebGL', category: 'Graphics' },
  { name: 'GLSL Shaders', category: 'Graphics' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Catmull-Rom Curves', category: 'Camera' },
  { name: 'MeshTransmissionMaterial', category: 'Materials' },
  { name: 'Bloom / CA', category: 'Effects' },
]

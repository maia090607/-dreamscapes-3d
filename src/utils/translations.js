const translations = {
  en: {
    worlds: [
      { label: 'Lucid Dream', subtitle: 'Ethereal · Warm · Fluid' },
      { label: 'Neon Pulse', subtitle: 'Cyber · Electric · Sharp' },
      { label: 'Cosmic Veil', subtitle: 'Infinite · Mystic · Deep' },
    ],
    scrollHint: 'Scroll to explore',
    navLabel: 'World',
    project: {
      title: 'Dreamscapes 3D',
      subtitle: 'A scroll-driven journey through three dream worlds',
      description1:
        'Inspired by the surreal and ever-shifting landscapes of dreams, Dreamscapes 3D is an interactive web experience that guides you through three distinct realms. Each world is a unique visual ecosystem — from the warm, glass-like fluidity of a lucid dream, through the electric pulse of a cyberpunk neon city, to the infinite silence of cosmic space.',
      description2:
        'Built entirely with web technologies, the experience runs in your browser without plugins. Every element is rendered in real-time 3D, from the crystalline transmission materials to the dynamic particle fields and orbital geometries.',
      techTitle: 'Technologies',
      videoTitle: 'Demo Video',
      videoBtn: 'Watch Demo Video',
      screenshotsTitle: 'Screenshots',
      screenshotLabels: ['Lucid Dream', 'Neon Pulse', 'Cosmic Veil'],
      viewSource: 'View Source Code',
      liveDemo: 'Live Demo',
    },
    loading: 'Loading...',
    langSwitch: 'ES',
  },
  es: {
    worlds: [
      { label: 'Sueño Lúcido', subtitle: 'Etéreo · Cálido · Fluido' },
      { label: 'Pulso Neon', subtitle: 'Cyber · Eléctrico · Afilado' },
      { label: 'Velo Cósmico', subtitle: 'Infinito · Místico · Profundo' },
    ],
    scrollHint: 'Desplázate para explorar',
    navLabel: 'Mundo',
    project: {
      title: 'Dreamscapes 3D',
      subtitle: 'Un viaje interactivo a través de tres mundos oníricos',
      description1:
        'Inspirado en los paisajes surrealistas y siempre cambiantes de los sueños, Dreamscapes 3D es una experiencia web interactiva que te guía a través de tres reinos distintos. Cada mundo es un ecosistema visual único — desde la cálida fluidez vítrea de un sueño lúcido, pasando por el pulso eléctrico de una ciudad cyberpunk de neón, hasta el silencio infinito del espacio cósmico.',
      description2:
        'Construido completamente con tecnologías web, la experiencia funciona en tu navegador sin complementos. Cada elemento se renderiza en 3D en tiempo real, desde los materiales de transmisión cristalinos hasta los campos de partículas dinámicos y las geometrías orbitales.',
      techTitle: 'Tecnologías',
      videoTitle: 'Video Demo',
      videoBtn: 'Ver Video Demo',
      screenshotsTitle: 'Capturas',
      screenshotLabels: ['Sueño Lúcido', 'Pulso Neon', 'Velo Cósmico'],
      viewSource: 'Ver Código Fuente',
      liveDemo: 'Demo en Vivo',
    },
    loading: 'Cargando...',
    langSwitch: 'EN',
  },
}

export function t(lang, key, ...args) {
  const keys = key.split('.')
  let value = translations[lang]
  for (const k of keys) {
    if (!value) return key
    value = value[k]
  }
  if (typeof value === 'function') return value(...args)
  return value || key
}

export const LANGUAGES = ['en', 'es']

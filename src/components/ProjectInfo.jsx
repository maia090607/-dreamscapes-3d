import { TECHNOLOGIES } from '../utils/constants'

function TechBadge({ name, category }) {
  const categoryColors = {
    Framework: '#ff6b9d',
    Engine: '#00ffff',
    Utilities: '#ffd166',
    Effects: '#ff00ff',
    Graphics: '#00ff88',
    Animation: '#ff6600',
    Camera: '#7b2ff7',
    Materials: '#f472b6',
  }

  return (
    <span
      className="tech-badge"
      style={{
        '--badge-color': categoryColors[category] || '#ffffff',
      }}
    >
      {name}
    </span>
  )
}

export default function ProjectInfo() {
  const techByCategory = TECHNOLOGIES.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div className="project-section">
      <div className="project-card">
        <div className="project-header">
          <div className="project-glow" />
          <h2>Dreamscapes 3D</h2>
          <p className="project-subtitle">
            A scroll-driven journey through three dream worlds
          </p>
        </div>

        <div className="project-description">
          <p>
            Inspired by the surreal and ever-shifting landscapes of dreams, Dreamscapes 3D
            is an interactive web experience that guides you through three distinct realms.
            Each world is a unique visual ecosystem — from the warm, glass-like fluidity of
            a lucid dream, through the electric pulse of a cyberpunk neon city, to the
            infinite silence of cosmic space.
          </p>
          <p>
            Built entirely with web technologies, the experience runs in your browser
            without plugins. Every element is rendered in real-time 3D, from the crystalline
            transmission materials to the dynamic particle fields and orbital geometries.
          </p>
        </div>

        <div className="project-tech">
          <h3>Technologies</h3>
          <div className="tech-grid">
            {Object.entries(techByCategory).map(([category, techs]) => (
              <div key={category} className="tech-group">
                <div className="tech-category">{category}</div>
                <div className="tech-items">
                  {techs.map((t) => (
                    <TechBadge key={t.name} {...t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-screenshots">
          <h3>Screenshots</h3>
          <div className="screenshots-grid">
            <div className="screenshot-card">
              <img
                src="/screenshots/dreamscape.png"
                alt="Lucid Dream"
                className="screenshot-img"
              />
              <div className="screenshot-label">Lucid Dream</div>
            </div>
            <div className="screenshot-card">
              <img
                src="/screenshots/neon.png"
                alt="Neon Pulse"
                className="screenshot-img"
              />
              <div className="screenshot-label">Neon Pulse</div>
            </div>
            <div className="screenshot-card">
              <img
                src="/screenshots/cosmic.png"
                alt="Cosmic Veil"
                className="screenshot-img"
              />
              <div className="screenshot-label">Cosmic Veil</div>
            </div>
          </div>
        </div>

        <div className="project-footer">
          <a
            href="https://github.com/maia090607/-dreamscapes-3d"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View Source Code
          </a>
          <a
            href="https://dreamscapes-3d.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  )
}

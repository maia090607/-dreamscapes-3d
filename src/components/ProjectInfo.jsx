import { useLanguage } from '../context/LanguageContext'
import { t, LANGUAGES } from '../utils/translations'
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
  const { lang } = useLanguage()
  const p = t(lang, 'project')

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
          <h2>{p.title}</h2>
          <p className="project-subtitle">{p.subtitle}</p>
        </div>

        <div className="project-description">
          <p>{p.description1}</p>
          <p>{p.description2}</p>
        </div>

        <div className="project-tech">
          <h3>{p.techTitle}</h3>
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

        <div className="project-video">
          <h3>{p.videoTitle}</h3>
          <a
            href="/video/demo.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {p.videoBtn}
          </a>
        </div>

        <div className="project-screenshots">
          <h3>{p.screenshotsTitle}</h3>
          <div className="screenshots-grid">
            {[
              { src: '/screenshots/dreamscape.png', label: p.screenshotLabels[0] },
              { src: '/screenshots/neon.png', label: p.screenshotLabels[1] },
              { src: '/screenshots/cosmic.png', label: p.screenshotLabels[2] },
            ].map((s, i) => (
              <div key={i} className="screenshot-card">
                <img src={s.src} alt={s.label} className="screenshot-img" />
                <div className="screenshot-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-footer">
          <a
            href="https://github.com/maia090607/-dreamscapes-3d"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {p.viewSource}
          </a>
          <a
            href="https://dreamscapes-3d.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {p.liveDemo}
          </a>
        </div>
      </div>
    </div>
  )
}

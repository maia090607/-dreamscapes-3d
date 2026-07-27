import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { WORLD_RANGES } from '../utils/constants'

export default function ScrollOverlay({ scroll }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const [showNav, setShowNav] = useState(false)
  const prevIdxRef = useRef(-1)
  const prevHintRef = useRef(true)

  useFrame(() => {
    const offset = scroll.offset
    const current = WORLD_RANGES.findIndex(
      (w) => offset >= w.start && offset < w.end
    )
    let idx
    if (current >= 0) {
      idx = current
    } else {
      const dists = WORLD_RANGES.map((w) => {
        const center = (w.start + w.end) / 2
        return Math.abs(offset - center)
      })
      idx = dists.indexOf(Math.min(...dists))
    }
    if (idx !== prevIdxRef.current) {
      prevIdxRef.current = idx
      setActiveIdx(idx)
    }
    const hint = scroll.offset < 0.05
    if (hint !== prevHintRef.current) {
      prevHintRef.current = hint
      setShowHint(hint)
    }
    if (scroll.offset > 0.05 && !showNav) setShowNav(true)
  })

  return (
    <Html fullscreen>
      <div className="overlay">
        {WORLD_RANGES.map((w, i) => (
          <div key={w.id}>
            <div
              className="world-title"
              style={{
                opacity: i === activeIdx ? 1 : 0,
                transform: `translateX(-50%) translateY(${i === activeIdx ? 0 : 12}px)`,
              }}
            >
              {w.label}
            </div>
            <div
              className="world-subtitle"
              style={{ opacity: i === activeIdx ? 0.7 : 0 }}
            >
              {w.subtitle}
            </div>
          </div>
        ))}

        <div
          className="nav-dots"
          style={{ opacity: showNav ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          {WORLD_RANGES.map((w, i) => (
            <div
              key={w.id}
              className={`nav-dot ${i === activeIdx ? 'active' : ''}`}
            />
          ))}
          <div className="nav-label">{WORLD_RANGES[activeIdx].label}</div>
        </div>

        <div className="scroll-hint" style={{ opacity: showHint ? 1 : 0 }}>
          <div className="arrow" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </Html>
  )
}

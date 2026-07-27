import { Html, useProgress } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'

export default function LoadingScreen() {
  const { lang } = useLanguage()
  const { progress } = useProgress()
  const loaded = progress === 100

  return (
    <Html center>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.8s ease',
          pointerEvents: loaded ? 'none' : 'auto',
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 24,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Dreamscapes
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff6b9d, #a855f7)',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: '0.75rem',
            opacity: 0.3,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {t(lang, 'loading')}
        </div>
      </div>
    </Html>
  )
}

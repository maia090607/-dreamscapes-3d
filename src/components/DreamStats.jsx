import { useEffect, useState } from 'react'

export default function DreamStats() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_SUB0_API_URL
    if (!apiUrl) {
      setError(true)
      return
    }
    fetch(`${apiUrl}/get-stats`)
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setError(true))
  }, [])

  if (error) return null

  return (
    <div className="dream-stats">
      {stats && (
        <>
          <div className="stat-total">
            {stats.action_2?.grand_total ?? '—'} explorers
          </div>
          {stats.action_1?.map((s) => (
            <div key={s.world_name} className="stat-row">
              <span>{s.world_name}</span>
              <span>{s.total_visits} visits · {s.avg_rating}/5</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

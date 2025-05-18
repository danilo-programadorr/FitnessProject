import { useEffect, useState } from 'react'
import { api } from '../api/client'

export function ApiTest() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/test')
      .then(response => {
        setData(response.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}
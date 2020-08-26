// hooks.js
import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function fetchUrl() {
    try {
      // const response = await fetch('https://test.cors.workers.dev/?' + url)
      const response = await fetch(
        'https://snowy-dawn-4154.uniswap-lists.workers.dev/?' + url
      )

      const json = await response.json()
      setData(json)
      setLoading(false)
    } catch (err) {
      console.log("Couldn't get this list")
      setError(true)
    }
  }
  useEffect(() => {
    fetchUrl()
  }, [])
  return [data, loading, error]
}

export { useFetch }

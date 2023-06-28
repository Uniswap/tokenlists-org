import { useState, useEffect, useMemo } from 'react'

interface ListReturn {
  list: any | undefined | null // TODO replace any
  loading: boolean
  error: boolean
}

export function getListURLFromListID(listID: string): string {
  if (listID.startsWith('https://')) {
    return listID
  } else if (listID?.endsWith('.eth')) {
    // proxy http urls through a CF worker
    return `https://wispy-bird-88a7.uniswap.workers.dev/?url=${`http://${listID}.link`}`
  } else {
    throw Error(`Unrecognized listId ${listID}`)
  }
}

export function useMultiFetch(listIDs: string[] = []): { [listID: string]: ListReturn } {
  const [lists, setLists] = useState<{ [url: string]: ListReturn['list'] }>({})

  useEffect(() => {
    if (listIDs.length > 0) {
      let stale = false

      listIDs.forEach((listID) =>
        fetch(getListURLFromListID(listID))
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((list) => {
            if (!stale) {
              setLists((lists) => ({ ...lists, [listID]: list }))
            }
          })
          .catch((error) => {
            if (!stale) {
              console.error(`Failed to fetch ${listID} at ${getListURLFromListID(listID)}`, error)
              setLists((lists) => ({ ...lists, [listID]: null }))
            }
          })
      )

      return () => {
        stale = true
        setLists({})
      }
    }
  }, [listIDs])

  return useMemo(
    () =>
      listIDs.reduce((accumulator: { [listID: string]: ListReturn }, listID) => {
        const list = lists[listID]
        const loading = list === undefined
        const error = list === null
        return { ...accumulator, [listID]: { list, loading, error } }
      }, {}),
    [listIDs, lists]
  )
}

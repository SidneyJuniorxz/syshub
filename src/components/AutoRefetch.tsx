'use client'

import { useState, useEffect } from 'react'

interface Props {
  initialData: any
  fetchFn: () => Promise<any>
  render: (data: any) => React.ReactNode
}

export function AutoRefetch({ initialData, fetchFn, render }: Props) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await fetchFn()
      setData(fresh)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return <>{render(data)}</>
}

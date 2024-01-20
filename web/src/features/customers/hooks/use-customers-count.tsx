import { LimpsysGateway } from '@/infra/gateways/limpsys'
import { useEffect, useState } from 'react'

const apiGateway = new LimpsysGateway()

export function useCustomersCount() {
  const [count, setCount] = useState<number | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    apiGateway.fetchCustomersCount().then((count) => {
      setCount(count)
      setIsFetching(false)
    })
  }, [])

  return { count, isFetching }
}

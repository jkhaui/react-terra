import { useEffect, useRef, useState } from 'react'
import { Block } from '@terra-money/terra.js'
import { CHAIN_ID, TERRA_WS_CLIENT } from '../utils/constants'
import { TerraWsEvent } from '../types'

export const useBlockNumber = () => {
  const ws = useRef<WebSocket | null>(null)

  const [blockNumber, setBlockNumber] = useState<Block>()
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<Event | CloseEvent>()

  useEffect(() => {
    ws.current = new WebSocket(TERRA_WS_CLIENT)

    ws.current.onopen = () => {
      setConnected(true)
      ws.current?.send(
        JSON.stringify({
          subscribe: TerraWsEvent.NEW_BLOCK,
          chain_id: CHAIN_ID
        })
      )
    }

    ws.current.onclose = (error) => {
      setConnected(false)
      setError(error)
    }

    ws.current.onerror = (error) => {
      setConnected(false)
      setError(error)
    }

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setBlockNumber(message.data.block)
    }
  }, [setBlockNumber])

  return { connected, error, blockNumber }
}

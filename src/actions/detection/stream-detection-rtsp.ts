import {
  DetectionStreamData,
  DetectionVideoStreamData,
} from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

interface StreamCallbacks {
  onOpen?: () => void
  onMessage?: (data: DetectionStreamData | DetectionVideoStreamData) => void
  onClose?: () => void
  onError?: (error: string) => void
}

export const streamDetectionRtsp = (callbacks: StreamCallbacks) => {
  const wsUrl = ENDPOINTS.DETECTIONS.RTSP_STREAM()
  const ws = new WebSocket(wsUrl)
  ws.binaryType = 'arraybuffer'

  let frameCount = 0

  ws.onopen = () => {
    console.log('Detection WebSocket connection established')
    callbacks.onOpen?.()
    ws.send(ENDPOINTS.RTSP.RTSP_URL())
  }

  ws.onmessage = (event) => {
    if (typeof event.data === 'string') {
      try {
        const result = JSON.parse(event.data) as DetectionStreamData
        callbacks.onMessage?.(result)
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? `Error parsing detection data: ${error.message}`
            : 'Error parsing detection data'
        console.error(errorMessage, error)
        callbacks.onError?.(errorMessage)
      }
    } else {
      const bytes = new Uint8Array(event.data)
      const blob = new Blob([bytes], { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      frameCount++
      const streamData: DetectionVideoStreamData = {
        stream: frameCount % 2 === 0 ? 'stream1' : 'stream2',
        url,
      }
      callbacks.onMessage?.(streamData)
    }
  }

  ws.onclose = () => {
    console.log('Detection WebSocket connection closed')
    callbacks.onClose?.()
  }

  ws.onerror = (error) => {
    console.error('Detection WebSocket error:', error)
    callbacks.onError?.('Detection WebSocket error occurred')
    throw new Error(
      'An unexpected error occurred during stream detection video'
    )
  }

  return ws
}

import { createLazyFileRoute } from '@tanstack/react-router'
import Detections from '@/features/detections'

export const Route = createLazyFileRoute('/_authenticated/detections/')({
  component: Detections,
})

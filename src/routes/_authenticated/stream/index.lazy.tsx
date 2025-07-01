import { createLazyFileRoute } from '@tanstack/react-router'
import StreamPage from '@/features/stream'

export const Route = createLazyFileRoute('/_authenticated/stream/')({
  component: StreamPage,
})

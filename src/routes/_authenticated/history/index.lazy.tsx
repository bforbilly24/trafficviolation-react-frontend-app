import { createLazyFileRoute } from '@tanstack/react-router'
import HistoryPage from '@/features/history'

export const Route = createLazyFileRoute('/_authenticated/history/')({
  component: HistoryPage,
})

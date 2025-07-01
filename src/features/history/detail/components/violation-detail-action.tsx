import { useState } from 'react'
import { Violations } from '@/types/detections'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ViolationDetailDialog } from './violation-detail-dialog'

interface ViolationDetailActionProps {
  data: Violations
}

export function ViolationDetailAction({ data }: ViolationDetailActionProps) {
  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<Violations | null>(null)

  const handleOpen = () => {
    setSelectedData(data)
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleOpen}>
        Detail
        <ExternalLink className='h-4 w-4 ml-2' />
      </Button>
      <ViolationDetailDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val)
          if (!val) {
            setSelectedData(null)
          }
        }}
        data={selectedData ?? data}
      />
    </>
  )
}

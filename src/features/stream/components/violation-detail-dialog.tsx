import { ViolationStreamData } from '@/types/detections'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ViolationDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ViolationStreamData
}

export function ViolationDetailDialog({
  open,
  onOpenChange,
  data,
}: ViolationDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg gap-6 bg-white dark:bg-neutral-900 rounded-lg shadow-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
            Detail Pelanggaran
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='flex-shrink-0'>
            <a href={data.image_path} target='_blank' rel='noopener noreferrer'>
              <img
                src={data.image_url}
                alt='Violation'
                className='h-48 w-48 object-cover rounded-md'
              />
            </a>
          </div>
          <div className='flex-1/2 space-y-4'>
            <div>
              <span className='font-bold text-neutral-900 dark:text-neutral-100'>
                Type:
              </span>{' '}
              {data.violation_type}
            </div>
            <div>
              <p className='font-bold text-neutral-900 dark:text-neutral-100'>
                Captured At:
              </p>{' '}
              {new Date(data.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

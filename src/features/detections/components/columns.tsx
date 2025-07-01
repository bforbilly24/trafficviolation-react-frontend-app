import { ColumnDef } from '@tanstack/react-table'
import { ViolationStreamData } from '@/types/detections'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ViolationDetailAction } from './violation-detail-action'

export const columns: ColumnDef<ViolationStreamData>[] = [
  {
    accessorKey: 'violation_id',
    header: 'Violation ID',
    cell: ({ row }) => <div>{row.original.violation_id}</div>,
  },
  {
    accessorKey: 'violation_type',
    header: 'Violation Type',
    cell: ({ row }) => <div>{row.original.violation_type}</div>,
  },
  {
    accessorKey: 'image_url',
    header: 'Image Capture',
    cell: ({ row }) => (
      <img
        src={row.original.image_url}
        alt='Stream'
        className='h-16 w-16 object-cover'
      />
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Captured At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{new Date(row.original.created_at).toLocaleString()}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <ViolationDetailAction data={row.original} />
    },
  },
]

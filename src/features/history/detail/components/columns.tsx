import { ColumnDef } from '@tanstack/react-table'
import { Violations } from '@/types/detections'
import { DataTableColumnHeader } from '@/features/users/components/data-table-column-header'
import { ViolationDetailAction } from './violation-detail-action'

export const columns: ColumnDef<Violations>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Violation ID' />
    ),
    cell: ({ row }) => {
      const videoId = row.getValue('id')
      return videoId
    },
  },
  {
    id: 'violation_type',
    accessorKey: 'violation_type',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Violation Type' />
    ),
    cell: ({ row }) => {
      const videoId = row.getValue('violation_type')
      return videoId
    },
  },
  {
    id: 'violation_path',
    accessorKey: 'image_path',
    enableHiding: false,
    header: 'Violation Path',
    cell: ({ row }) => (
      <img
        src={row.original.image_path}
        alt='Captured violation'
        className='h-16 w-16 object-cover'
      />
    ),
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Captured At' />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at')
      return createdAt
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <ViolationDetailAction data={row.original} />
    },
  },
]

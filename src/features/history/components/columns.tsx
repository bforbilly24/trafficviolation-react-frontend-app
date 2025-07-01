import { ColumnDef } from '@tanstack/react-table'
import { Videos } from '@/types/detections'
import { DataTableColumnHeader } from '@/features/users/components/data-table-column-header'
import { HistoryDetailAction } from './history-detail-action'

export const columns: ColumnDef<Videos>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => {
      const videoId = row.getValue('id')
      return videoId
    },
  },
  {
    id: 'file_name',
    accessorKey: 'file_name',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='File Name' />
    ),
    cell: ({ row }) => {
      const videoId = row.getValue('id')
      const fileName = row.getValue('file_name')
      return videoId === 1 ? 'RTSP Link Stream' : fileName
    },
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Captured At' />
    ),
    cell: ({ row }) => {
      const videoId = row.getValue('id')
      const createdAt = row.getValue('created_at')
      return videoId === 1 ? 'Live' : createdAt
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <HistoryDetailAction data={row.original} />
    },
  },
]

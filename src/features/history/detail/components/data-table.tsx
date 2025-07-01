import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { getViolation } from '@/actions/detection/get-violation'
import { ViolationResponse, Violations } from '@/types/detections'
import { toast } from '@/hooks/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'

interface DataTableProps {
  columns: ColumnDef<Violations>[]
  videoId: string
}

export function DataTable({ columns, videoId }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, error } = useQuery<ViolationResponse>({
    queryKey: ['violations', videoId, page, limit],
    queryFn: () => getViolation(videoId, page, limit),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Gagal memuat history pelanggaran'
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: message,
      })
    }
  }, [error])

  const table = useReactTable({
    data: data?.violations || [],
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: data?.pagination.total_pages ?? -1,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater
      setPage(newState.pageIndex + 1)
      setLimit(newState.pageSize)
    },
  })

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            Memuat...
          </TableCell>
        </TableRow>
      )
    }

    if (!table.getRowModel().rows?.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            Tidak ada hasil capture.
          </TableCell>
        </TableRow>
      )
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pagination={data?.pagination} />
    </div>
  )
}

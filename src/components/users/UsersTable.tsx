import * as React from 'react'
import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Link } from '@tanstack/react-router'
import { Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import type { User } from '@/api/users'
import { useDebounce } from '@/hooks/useDebounce'
import { UsersFilter } from '@/components/users/UsersFilter'
import { TablePagination } from '@/components/shared/TablePagination'

interface UsersTableProps {
  data: User[]
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const UsersTable = ({ data, onDelete, isDeleting }: UsersTableProps) => {
  const { t } = useTranslation()
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)
  const isFiltering = globalFilterInput !== globalFilter
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  const handleConfirmDelete = () => {
    if (userToDelete !== null) {
      setDeletingId(userToDelete)
      onDelete(userToDelete)
      setUserToDelete(null)
    }
  }

  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      id: 'index',
      header: t('users.index', 'ลำดับ'),
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination
        const rowIndex = table.getRowModel().rows.indexOf(row)
        const sequenceNumber = pageIndex * pageSize + rowIndex + 1

        return (
          <Badge variant="outline" className="font-mono text-xs">
            {sequenceNumber}
          </Badge>
        )
      },
      size: 60,
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'name',
      header: t('users.name', 'Name'),
      cell: ({ row }) => <span className="font-medium text-sm">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'email',
      header: t('users.email', 'Email'),
      cell: ({ row }) => <span className="text-sm">{row.getValue('email')}</span>,
    },
    {
      accessorKey: 'phone',
      header: t('users.phone', 'Phone'),
      cell: ({ row }) => <span className="text-sm">{(row.getValue('phone') as string) ?? '-'}</span>,
    },
    {
      accessorKey: 'website',
      header: t('users.website', 'Website'),
      cell: ({ row }) => <span className="text-sm">{(row.getValue('website') as string) ?? '-'}</span>,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <div className="flex items-center gap-2 justify-end">
            <Link
              to="/users/$userId"
              params={{ userId: String(id) }}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              {t('users.edit', 'Edit')}
            </Link>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting && deletingId === id}
              onClick={() => setUserToDelete(id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              {isDeleting && deletingId === id ? t('users.deleting', 'Deleting...') : t('users.delete', 'Delete')}
            </Button>
          </div>
        )
      },
      size: 160,
      enableGlobalFilter: false,
    },
  ], [t, isDeleting, deletingId])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilterInput,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="space-y-4">
      <UsersFilter
        globalFilter={globalFilterInput}
        setGlobalFilter={(value) => setGlobalFilterInput(value)}
        isFiltering={isFiltering}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {t('users.noUsers', 'No users found.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        info={t('users.pageInfo', {
          page: table.getState().pagination.pageIndex + 1,
          pageCount: table.getPageCount(),
          count: table.getFilteredRowModel().rows.length,
          suffix: table.getFilteredRowModel().rows.length !== 1 ? 's' : '',
          defaultValue: 'Page {{page}} of {{pageCount}} · {{count}} result{{suffix}}',
        })}
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canPrevious={table.getCanPreviousPage()}
        canNext={table.getCanNextPage()}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
        onPageIndex={(idx) => table.setPageIndex(idx)}
        previousLabel={t('users.previous', 'Previous')}
        nextLabel={t('users.next', 'Next')}
      />

      <Dialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('users.deleteTitle', 'Delete User')}</DialogTitle>
            <DialogDescription>
              {t('users.deleteConfirm', {
                id: userToDelete ?? '',
                defaultValue: 'Are you sure you want to delete user #{{id}}? This action cannot be undone.',
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              {t('users.cancel', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={userToDelete !== null && isDeleting && deletingId === userToDelete}
            >
              {userToDelete !== null && isDeleting && deletingId === userToDelete
                ? t('users.deleting', 'Deleting...')
                : t('users.delete', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

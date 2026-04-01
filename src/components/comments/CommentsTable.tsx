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
import { MessageSquareText, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import type { Comment } from '@/api/comments'
import { useDebounce } from '@/hooks/useDebounce'
import { CommentsFilter } from '@/components/comments/CommentsFilter'
import { TablePagination } from '@/components/shared/TablePagination'

interface CommentsTableProps {
  data: Comment[]
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const CommentsTable = ({ data, onDelete, isDeleting }: CommentsTableProps) => {
  const { t } = useTranslation()
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)
  const isFiltering = globalFilterInput !== globalFilter
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

  const handleConfirmDelete = () => {
    if (commentToDelete !== null) {
      setDeletingId(commentToDelete)
      onDelete(commentToDelete)
      setCommentToDelete(null)
    }
  }

  const columns = React.useMemo<ColumnDef<Comment>[]>(() => [
    {
      id: 'index',
      header: t('comments.index', 'ลำดับ'),
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
      accessorKey: 'postId',
      header: t('comments.postId', 'Post'),
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-mono text-xs">
          #{row.getValue('postId')}
        </Badge>
      ),
      size: 80,
    },
    {
      accessorKey: 'name',
      header: t('comments.name', 'Name'),
      cell: ({ row }) => (
        <div className="max-w-[260px]">
          <p className="truncate font-medium text-sm">{row.getValue('name')}</p>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: t('comments.email', 'Email'),
      cell: ({ row }) => <span className="text-sm">{row.getValue('email')}</span>,
    },
    {
      accessorKey: 'body',
      header: t('comments.body', 'Body'),
      cell: ({ row }) => (
        <div className="max-w-[520px] flex items-start gap-2">
          <MessageSquareText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="truncate text-sm text-muted-foreground">{row.getValue('body')}</p>
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <div className="flex items-center gap-2 justify-end">
            <Link
              to="/comments/$commentId"
              params={{ commentId: String(id) }}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              {t('comments.edit', 'Edit')}
            </Link>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting && deletingId === id}
              onClick={() => setCommentToDelete(id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              {isDeleting && deletingId === id
                ? t('comments.deleting', 'Deleting...')
                : t('comments.delete', 'Delete')}
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
      <CommentsFilter
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
                  {t('comments.noComments', 'No comments found.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        info={t('comments.pageInfo', {
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
        previousLabel={t('comments.previous', 'Previous')}
        nextLabel={t('comments.next', 'Next')}
      />

      <Dialog open={commentToDelete !== null} onOpenChange={(open) => !open && setCommentToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('comments.deleteTitle', 'Delete Comment')}</DialogTitle>
            <DialogDescription>
              {t('comments.deleteConfirm', {
                id: commentToDelete ?? '',
                defaultValue: 'Are you sure you want to delete comment #{{id}}? This action cannot be undone.',
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentToDelete(null)}>
              {t('comments.cancel', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={commentToDelete !== null && isDeleting && deletingId === commentToDelete}
            >
              {commentToDelete !== null && isDeleting && deletingId === commentToDelete
                ? t('comments.deleting', 'Deleting...')
                : t('comments.delete', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

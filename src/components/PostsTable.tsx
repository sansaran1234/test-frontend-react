// src/components/PostsTable.tsx
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
import { Input } from '@/components/ui/input'
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
import type { Post } from '@/api/posts'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface PostsTableProps {
  data: Post[]
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export function PostsTable({ data, onDelete, isDeleting }: PostsTableProps) {
  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)

  const handleConfirmDelete = () => {
    if (postToDelete !== null) {
      setDeletingId(postToDelete)
      onDelete(postToDelete)
      setPostToDelete(null)
    }
  }

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: 'id',
      header: t('posts.id'),
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono text-xs">
          #{row.getValue('id')}
        </Badge>
      ),
      size: 60,
    },
    {
      accessorKey: 'userId',
      header: t('posts.user'),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{t('posts.user')} {row.getValue('userId')}</span>
      ),
      size: 80,
    },
    {
      accessorKey: 'title',
      header: t('posts.postTitle'),
      cell: ({ row }) => (
        <div className="max-w-[420px]">
          <p className="truncate font-medium text-sm">{row.getValue('title')}</p>
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
              to="/posts/$postId"
              params={{ postId: String(id) }}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              {t('posts.edit')}
            </Link>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting && deletingId === id}
              onClick={() => setPostToDelete(id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              {isDeleting && deletingId === id ? t('posts.deleting') : t('posts.delete')}
            </Button>
          </div>
        )
      },
      size: 160,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('posts.searchPlaceholder')}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
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
                  {t('posts.noPosts')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('posts.pageInfo', {
            page: table.getState().pagination.pageIndex + 1,
            pageCount: table.getPageCount(),
            count: table.getFilteredRowModel().rows.length,
            suffix: table.getFilteredRowModel().rows.length !== 1 ? 's' : ''
          })}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            {t('posts.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('posts.next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('posts.deleteTitle')}</DialogTitle>
            <DialogDescription>
              {t('posts.deleteConfirm', { id: postToDelete })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostToDelete(null)}>
              {t('posts.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t('posts.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import * as React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type PageItem = number | 'ellipsis'

function getPageItems(pageIndex: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i)
  }

  const items: PageItem[] = []
  const last = pageCount - 1
  const start = Math.max(1, pageIndex - 1)
  const end = Math.min(last - 1, pageIndex + 1)

  items.push(0)
  if (start > 1) items.push('ellipsis')
  for (let i = start; i <= end; i++) items.push(i)
  if (end < last - 1) items.push('ellipsis')
  items.push(last)

  return items
}

interface TablePaginationProps {
  info: React.ReactNode
  pageIndex: number
  pageCount: number
  canPrevious: boolean
  canNext: boolean
  onPrevious: () => void
  onNext: () => void
  onPageIndex: (pageIndex: number) => void
  previousLabel: React.ReactNode
  nextLabel: React.ReactNode
  className?: string
}

export const TablePagination = ({
  info,
  pageIndex,
  pageCount,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
  onPageIndex,
  previousLabel,
  nextLabel,
  className,
}: TablePaginationProps) => {
  const items = React.useMemo(
    () => getPageItems(pageIndex, pageCount),
    [pageIndex, pageCount]
  )

  const handleClick = (e: React.MouseEvent, fn: () => void, disabled?: boolean) => {
    e.preventDefault()
    if (disabled) return
    fn()
  }

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <p className="text-sm text-muted-foreground">{info}</p>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => handleClick(e, onPrevious, !canPrevious)}
              className={cn(!canPrevious && 'pointer-events-none opacity-50')}
            >
              {previousLabel}
            </PaginationPrevious>
          </PaginationItem>

          {items.map((item, idx) => (
            <PaginationItem key={`${item}-${idx}`}>
              {item === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === pageIndex}
                  onClick={(e) => handleClick(e, () => onPageIndex(item))}
                >
                  {item + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => handleClick(e, onNext, !canNext)}
              className={cn(!canNext && 'pointer-events-none opacity-50')}
            >
              {nextLabel}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}


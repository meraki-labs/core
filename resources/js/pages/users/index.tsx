import React, { useState } from 'react'
import { type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import UsersLayout from './layout';
import { User, userColumns } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { DataTableToolbar } from './components/data-table-toolbar';
import { DataTableViewOptions } from './components/data-table-view-options';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users Component',
    href: route('users.index'),
  },
  {
    title: 'Users List',
    href: route('users.index'),
  },
];

export interface UsersPageProps {
  users: {
    data: User[]
    links: { label: string; url: string | null; active: boolean }[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  filters: {
    keywords?: string
    sort?: string
    order?: 'asc' | 'desc'
    page?: number
    limit?: number
  }
  [key: string]: unknown
}

export default function Users() {
  const { users, filters } = usePage<UsersPageProps>().props
  const [keywords, setKeywords] = useState(filters.keywords || '')
  const [sort, setSort] = useState(filters.sort || 'created_at')
  const [order, setOrder] = useState(filters.order || 'asc')

  const handleSearch = (e: any) => {
    e.preventDefault()
    router.get(route('users.index'), {
      keywords,
      sort: sort,
      order: order,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const toggleSorting = (field: any) => {
    const nextType = sort === field && order === 'asc' ? 'desc' : 'asc'
    setSort(field)
    setOrder(nextType)

    router.get(route('users.index'), {
      keywords,
      sort: field,
      order: nextType,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>(() =>
    filters.sort ? [{ id: String(filters.sort), desc: filters.order === 'desc' }] : []
  )

  const pageIndex = (users.current_page ?? 1) - 1
  const pageSize = users.per_page ?? 10
  const pageCount = users.last_page ?? 1
  const table = useReactTable<User>({
    data: users.data,
    columns: userColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: false,
    manualPagination: true,
    pageCount,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(next)

      const s = next[0]
      const nextSort = s?.id
      const nextOrder = s ? (s.desc ? 'desc' : 'asc') : 'asc'
      setSort(s?.id)
      setOrder(s ? (s.desc ? 'desc' : 'asc') : 'asc')

      router.get(route('users.index'),
        {
          ...filters,
          page: 1,
          sort: nextSort,
          order: nextOrder
        },
        {
          preserveScroll: true,
          preserveState: true,
          replace: true,
        }
      )
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function'
        ? updater({ pageIndex, pageSize }) : updater

      const nextPage = (next.pageIndex ?? pageIndex) + 1
      const nextLimit = next.pageSize ?? pageSize

      router.get(route('users.index'),
        {
          ...filters,
          page: nextPage,
          limit: nextLimit,
        },
        {
          preserveScroll: true,
          preserveState: true,
          replace: true,
        }
      )
    },
  })
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <UsersLayout breadcrumbs={breadcrumbs}>
      {/* <DataTable data={users.data} columns={userColumn}/> */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter Users..."
            value={keywords}
            onChange={(event) => {
              setKeywords(event.target.value)

              router.get(route('users.index'),
                {
                  ...filters,
                  page: 1,
                  keywords: event.target.value
                },
                {
                  preserveScroll: true,
                  preserveState: true,
                  replace: true,
                }
              )
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />

          {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={userColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </UsersLayout >
  );
}

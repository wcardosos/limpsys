import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/ui/table'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import React from 'react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

const data: Customer[] = [
  {
    id: '1',
    name: 'Wagner Cardoso',
    email: 'wagner@limpsys.com',
    phone: '11111111111',
  },
  {
    id: '2',
    name: 'Janaíres Cardoso',
    email: 'janny@limpsys.com',
    phone: '22222222222',
  },
  {
    id: '3',
    name: 'Wagner Cardoso',
    email: 'wagner@limpsys.com',
    phone: '11111111111',
  },
  {
    id: '4',
    name: 'Janaíres Cardoso',
    email: 'janny@limpsys.com',
    phone: '22222222222',
  },
  {
    id: '5',
    name: 'Wagner Cardoso',
    email: 'wagner@limpsys.com',
    phone: '11111111111',
  },
]

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
  },
]

export function Customers() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onFilterCustomers = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1 className="font-bold text-blue-500 text-3xl">Seus clientes</h1>

      <section className="flex justify-between mt-6">
        <form className="flex gap-2 w-7/12">
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por nome"
          />
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por e-mail"
          />
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por telefone"
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-gray-50"
            onClick={onFilterCustomers}
          >
            Filtrar
          </Button>
        </form>
        <Button
          variant="ghost"
          className="text-blue-500 hover:text-blue-500 hover:bg-blue-100"
        >
          Adicionar cliente
        </Button>
      </section>
      <section className="py-10">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

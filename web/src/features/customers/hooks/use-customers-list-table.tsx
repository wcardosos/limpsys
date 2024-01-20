import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Customer } from '../entities/customer'
import { useContext } from 'react'
import { CustomersListTableContext } from '../contexts/customers-list-table'

export function useCustomersListTable() {
  const { data, isFetching } = useContext(CustomersListTableContext)

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return {
    table,
    columns,
    isFetching,
  }
}

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Customer } from '../entities/customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'
import { useEffect, useState } from 'react'

const apiGateway = new LimpsysGateway()

export function useCustomersListTable() {
  const [data, setData] = useState<Customer[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    apiGateway.get('/customers').then((customers) => {
      setData(customers)
      setIsFetching(false)
    })
  }, [])

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
    data,
  }
}

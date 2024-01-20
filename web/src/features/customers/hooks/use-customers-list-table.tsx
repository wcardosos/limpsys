import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Customer } from '../entities/customer'

export function useCustomersListTable() {
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    columns,
  }
}

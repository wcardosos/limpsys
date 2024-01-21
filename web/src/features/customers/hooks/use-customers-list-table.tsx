import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Customer } from '../entities/customer'
import { useContext } from 'react'
import { CustomersListTableContext } from '../contexts/customers-list-table'
import { Button } from '@/common/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/common/components/ui/dropdown-menu'

export function useCustomersListTable() {
  const { data, isFetching, deleteCustomer } = useContext(
    CustomersListTableContext,
  )

  const onDeleteConsumer = async (id: string) => {
    await deleteCustomer(id)
  }

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
    {
      accessorKey: 'xCoordinate',
      header: 'Coordenada X',
      cell: ({ row }) => <div>{row.getValue('xCoordinate')}</div>,
    },
    {
      accessorKey: 'yCoordinate',
      header: 'Coordenada Y',
      cell: ({ row }) => <div>{row.getValue('yCoordinate')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-blue-500"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-blue-500">
              Opções
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-gray-800 cursor-pointer"
              onClick={() => onDeleteConsumer(row.original.id!)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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

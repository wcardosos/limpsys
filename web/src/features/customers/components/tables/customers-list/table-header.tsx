import { TableHeader, TableRow, TableHead } from '@/common/components/ui/table'
import { Customer } from '@/features/customers/entities/customer'
import { HeaderGroup, flexRender } from '@tanstack/react-table'

interface CustomersListTableHeaderProps {
  headerGroups: HeaderGroup<Customer>[]
}

export function CustomersListTableHeader({
  headerGroups,
}: CustomersListTableHeaderProps) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
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
  )
}

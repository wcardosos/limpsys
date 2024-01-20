import { TableBody, TableCell, TableRow } from '@/common/components/ui/table'
import { Customer } from '@/features/customers/entities/customer'
import { ColumnDef, RowModel, flexRender } from '@tanstack/react-table'

interface CustomersListTableBodyProps {
  rowModel: RowModel<Customer>
  columns: ColumnDef<Customer>[]
}

export function CustomersListTableBody({
  rowModel,
  columns,
}: CustomersListTableBodyProps) {
  return (
    <TableBody>
      {rowModel.rows?.length ? (
        rowModel.rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Sem resultados
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

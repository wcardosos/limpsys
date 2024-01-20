import { Button } from '@/common/components/ui/button'
import { Customer } from '@/features/customers/entities/customer'
import { Table } from '@tanstack/react-table'

interface CustomersListTableFooterProps {
  table: Table<Customer>
}

export function CustomersListTableFooter({
  table,
}: CustomersListTableFooterProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()} páginas.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('a implementar')}
          disabled
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('a implementar')}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

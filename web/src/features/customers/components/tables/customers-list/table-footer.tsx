import { Button } from '@/common/components/ui/button'
import { CustomersListTableContext } from '@/features/customers/contexts/customers-list-table'
import { useContext } from 'react'

export function CustomersListTableFooter() {
  const { filterCustomers, currentPage, hasNextPage, hasPreviousPage } =
    useContext(CustomersListTableContext)

  const goToPreviousPage = () => {
    filterCustomers({
      page: currentPage - 1,
    })
  }

  const goToNextPage = () => {
    filterCustomers({
      page: currentPage + 1,
    })
  }

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextPage}
          disabled={!hasNextPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

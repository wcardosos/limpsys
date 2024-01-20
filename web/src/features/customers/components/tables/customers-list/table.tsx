import { Table } from '@/common/components/ui/table'
import { useCustomersListTable } from '@/features/customers/hooks/use-customers-list-table'
import { CustomersListTableHeader } from './table-header'
import { CustomersListTableBody } from './table-body'
import { CustomersListTableFooter } from './table-footer'
import { Spinner } from '@/common/components/spinner'

export function CustomersListTable() {
  const { table, columns, isFetching } = useCustomersListTable()
  return (
    <>
      {isFetching ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <CustomersListTableHeader
                headerGroups={table.getHeaderGroups()}
              />
              <CustomersListTableBody
                rowModel={table.getRowModel()}
                columns={columns}
              />
            </Table>
          </div>
          <CustomersListTableFooter table={table} />
        </>
      )}
    </>
  )
}

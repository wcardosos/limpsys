import { CreateCustomerDialog } from '@/features/customers/components/create-customer-dialog'
import { CustomerListFilterForm } from '@/features/customers/components/forms/customer-list-filter'
import { CustomersListTable } from '@/features/customers/components/tables/customers-list/table'
import { CustomersListTableProvider } from '@/features/customers/contexts/customers-list-table'

export function Customers() {
  return (
    <div>
      <h1 className="font-bold text-blue-500 text-3xl">Seus clientes</h1>

      <CustomersListTableProvider>
        <section className="flex justify-between mt-6">
          <CustomerListFilterForm />
          <CreateCustomerDialog />
        </section>
        <section className="py-10">
          <CustomersListTable />
        </section>
      </CustomersListTableProvider>
    </div>
  )
}

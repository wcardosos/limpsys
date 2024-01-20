import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { CustomersListTable } from '@/features/customers/components/tables/customers-list/table'

import React from 'react'

export function Customers() {
  const onFilterCustomers = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1 className="font-bold text-blue-500 text-3xl">Seus clientes</h1>

      <section className="flex justify-between mt-6">
        <form className="flex gap-2 w-7/12">
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por nome"
          />
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por e-mail"
          />
          <Input
            className="focus-visible:ring-blue-500"
            placeholder="Filtrar por telefone"
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-gray-50"
            onClick={onFilterCustomers}
          >
            Filtrar
          </Button>
        </form>
        <Button
          variant="ghost"
          className="text-blue-500 hover:text-blue-500 hover:bg-blue-100"
        >
          Adicionar cliente
        </Button>
      </section>
      <section className="py-10">
        <CustomersListTable />
      </section>
    </div>
  )
}

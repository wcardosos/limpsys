import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { CustomersListTableContext } from '@/features/customers/contexts/customers-list-table'
import { useContext } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

type FiltersInput = {
  name: string
  email: string
  phone: string
}

export function CustomerListFilterForm() {
  const { filterCustomers } = useContext(CustomersListTableContext)

  const onFilterCustomersSubmit: SubmitHandler<FiltersInput> = (formValues) => {
    filterCustomers(formValues)
  }

  const { register, handleSubmit, watch } = useForm<FiltersInput>()
  const nameFilter = watch('name')
  const emailFilter = watch('email')
  const phoneFilter = watch('phone')

  const isFilterButtonDisabled = !nameFilter && !emailFilter && !phoneFilter

  return (
    <form
      className="flex flex-wrap md:flex-nowrap gap-2 w-7/12"
      onSubmit={handleSubmit(onFilterCustomersSubmit)}
    >
      <Input
        className="focus-visible:ring-blue-500"
        placeholder="Filtrar por nome"
        {...register('name')}
      />
      <Input
        className="focus-visible:ring-blue-500"
        placeholder="Filtrar por e-mail"
        {...register('email')}
      />
      <Input
        className="focus-visible:ring-blue-500"
        placeholder="Filtrar por telefone"
        {...register('phone')}
      />
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-gray-50"
        disabled={isFilterButtonDisabled}
      >
        Filtrar
      </Button>
    </form>
  )
}

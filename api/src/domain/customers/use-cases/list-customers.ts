import { inject, injectable } from 'tsyringe'
import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'

interface ListCustomersUseCaseRequest {
  filters?: {
    name?: string
    email?: string
    phone?: string
    page?: number
  }
}

interface ListCustomerUseCaseResponse {
  customers: Customer[]
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

@injectable()
export class ListCustomersUseCase {
  private ITEMS_PER_PAGE: number
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {
    this.ITEMS_PER_PAGE = 5
  }

  async execute({
    filters,
  }: ListCustomersUseCaseRequest): Promise<ListCustomerUseCaseResponse> {
    const totalCustomersCount = await this.customersRepository.count(filters)
    const currentPage = filters?.page || 1

    const { hasNextPage, hasPreviousPage } = this.getPagination(
      totalCustomersCount,
      currentPage,
    )

    const customers = await this.customersRepository.findAll(
      this.ITEMS_PER_PAGE,
      filters,
    )

    return { customers, currentPage, hasNextPage, hasPreviousPage }
  }

  private getPagination(totalCustomersCount: number, currentPage: number) {
    const totalPages = Math.ceil(totalCustomersCount / this.ITEMS_PER_PAGE)
    const hasNextPage = currentPage < totalPages
    const hasPreviousPage = totalPages > 1 && currentPage > 1

    return { hasNextPage, hasPreviousPage }
  }
}

import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { CreateCustomerDialogProvider } from './features/customers/contexts/create-customer-dialog'
import { CustomersProvider } from './features/customers/contexts/customers'

export function App() {
  return (
    <CustomersProvider>
      <CreateCustomerDialogProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CreateCustomerDialogProvider>
    </CustomersProvider>
  )
}

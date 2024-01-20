import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { CreateCustomerDialogProvider } from './features/customers/contexts/create-customer-dialog'
import { CustomersProvider } from './features/customers/contexts/customers'
import { RouteCalculationProvider } from './features/route/contexts/route-calculation'

export function App() {
  return (
    <BrowserRouter>
      <CustomersProvider>
        <CreateCustomerDialogProvider>
          <RouteCalculationProvider>
            <Router />
          </RouteCalculationProvider>
        </CreateCustomerDialogProvider>
      </CustomersProvider>
    </BrowserRouter>
  )
}

import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { CreateCustomerDialogProvider } from './features/customers/contexts/create-customer-dialog'
import { CustomersProvider } from './features/customers/contexts/customers'
import { RouteCalculationProvider } from './features/route/contexts/route-calculation'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryFallback } from './_error'

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <BrowserRouter>
        <CustomersProvider>
          <CreateCustomerDialogProvider>
            <RouteCalculationProvider>
              <Router />
            </RouteCalculationProvider>
          </CreateCustomerDialogProvider>
        </CustomersProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

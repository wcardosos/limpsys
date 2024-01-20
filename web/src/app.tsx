import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { CreateCustomerDialogProvider } from './features/customers/contexts/create-customer-dialog'

export function App() {
  return (
    <CreateCustomerDialogProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CreateCustomerDialogProvider>
  )
}

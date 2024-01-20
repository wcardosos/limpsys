import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card'
import { Link } from 'react-router-dom'
import { CreateCustomerDialog } from '../create-customer-dialog'

export function PlatformActionsCard() {
  return (
    <Card className="w-[360px] py-6 border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-700">Ações</CardTitle>
      </CardHeader>
      <CardContent className="text-blue-500 grid gap-2">
        <CreateCustomerDialog>
          <p className="text-blue-500 cursor-pointer">Adicionar cliente</p>
        </CreateCustomerDialog>
        <Link to="/customers">Ver clientes cadastrados</Link>
        <Link to="/route">Calcular melhor rota</Link>
      </CardContent>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card'
import { useCustomersCount } from '../../hooks/use-customers-count'
import { Spinner } from '@/common/components/spinner'

export function RegisteredCustomersCard() {
  const { count: customersCount, isFetching } = useCustomersCount()
  return (
    <Card className="w-[512px] py-6 border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-700">Clientes cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="text-blue-500">
        {isFetching ? (
          <Spinner />
        ) : (
          <span className="font-medium text-8xl">{customersCount}</span>
        )}
      </CardContent>
    </Card>
  )
}

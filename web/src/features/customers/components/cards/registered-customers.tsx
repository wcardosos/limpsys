import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card'

export function RegisteredCustomersCard() {
  return (
    <Card className="w-[512px] py-6 border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-700">Clientes cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="text-blue-500">
        <span className="font-medium text-8xl">16</span>
      </CardContent>
    </Card>
  )
}

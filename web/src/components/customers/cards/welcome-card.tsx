import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function WelcomeCard() {
  return (
    <Card className="w-[512px] py-6 border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-700">Bem vindo(a) ao limpsys</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-800">
        <p>
          É um prazer recebê-lo! Sua solução completa para tornar a gestão de
          clientes em serviços residenciais mais simples e eficaz.
        </p>
        <p>No nosso sistema você pode:</p>
        <ul className="list-disc px-10">
          <li>cadastrar clientes;</li>
          <li>editar clientes;</li>
          <li>
            calcular a rota de atendimento dos clientes mais rápida possível.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

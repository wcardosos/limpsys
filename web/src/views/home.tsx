import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-y-10">
      <Card className="w-[512px] py-6 border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700">
            Bem vindo(a) ao limpsys
          </CardTitle>
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
      <Card className="w-[360px] py-6 border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700">Ações</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-500 grid gap-2">
          <Link to="">Adicionar cliente</Link>
          <Link to="">Ver clientes cadastrados</Link>
          <Link to="">Calcular melhor rota</Link>
        </CardContent>
      </Card>
      <Card className="w-[512px] py-6 border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700">Clientes cadastrados</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-500">
          <span className="font-medium text-8xl">16</span>
        </CardContent>
      </Card>
    </main>
  )
}

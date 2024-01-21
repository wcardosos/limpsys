import { useContext, useState } from 'react'
import { RouteCalculationContext } from '../contexts/route-calculation'
import { Button } from '@/common/components/ui/button'
import { RouteList } from './route-list'
import { Spinner } from '@/common/components/spinner'
import { useErrorFeedback } from '@/common/hooks/use-error-feedback'

export function RouteContainer() {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isRouteAlreadyFetched, setIsRouteAlreadyFetched] =
    useState<boolean>(false)
  const { route, calculateRoute } = useContext(RouteCalculationContext)
  const { showErrorFeedback } = useErrorFeedback()

  const onCalculateRoute = async () => {
    try {
      setIsFetching(true)

      await calculateRoute()

      setIsRouteAlreadyFetched(true)
    } catch (error) {
      showErrorFeedback(
        'A rota não pôde ser calculada. Tente novamente mais tarde',
      )
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <>
      <div className="flex justify-center pt-10 pb-6">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-gray-50"
          onClick={onCalculateRoute}
        >
          Calcular melhor rota
        </Button>
      </div>
      {isFetching ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : null}
      {route.length ? <RouteList /> : null}
      {!isRouteAlreadyFetched ? (
        <p className="text-center mt-16">
          Clique no botão para iniciar o cálculo da rota
        </p>
      ) : null}
      {isRouteAlreadyFetched && !route.length ? (
        <p className="text-center mt-16">Sem resultados</p>
      ) : null}
    </>
  )
}

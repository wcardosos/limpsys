import { useToast } from '../components/ui/use-toast'

export function useErrorFeedback() {
  const { toast } = useToast()

  const showErrorFeedback = (message: string) => {
    toast({
      title: `Não foi possível processar a sua solicitação`,
      description: message,
      className: 'bg-red-100 border-red-500 text-red-500',
    })
  }

  return {
    showErrorFeedback,
  }
}

import { PlatformActionsCard } from '@/features/customers/components/cards/platform-actions-card'
import { RegisteredCustomersCard } from '@/features/customers/components/cards/registered-customers'
import { WelcomeCard } from '@/features/customers/components/cards/welcome-card'

export function Home() {
  return (
    <main className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-y-10">
      <WelcomeCard />
      <PlatformActionsCard />
      <RegisteredCustomersCard />
    </main>
  )
}

import { PlatformActionsCard } from '@/components/customers/cards/platform-actions-card'
import { RegisteredCustomersCard } from '@/components/customers/cards/registered-customers'
import { WelcomeCard } from '@/components/customers/cards/welcome-card'

export function Home() {
  return (
    <main className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-y-10">
      <WelcomeCard />
      <PlatformActionsCard />
      <RegisteredCustomersCard />
    </main>
  )
}

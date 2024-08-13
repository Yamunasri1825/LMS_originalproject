import { createFileRoute } from '@tanstack/react-router'
import OrganizationListPage from '@/pages/organization/OrganizationListPage'
export const Route = createFileRoute('/organization/')({
  component: () => OrganizationListPage()
})
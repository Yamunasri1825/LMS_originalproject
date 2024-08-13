import { createFileRoute } from '@tanstack/react-router'
import OrganizationAddPage from '@/pages/organization/OrganizationAddPage'
export const Route = createFileRoute('/organization/OrganizationAdd')({
  component: () => OrganizationAddPage()
})
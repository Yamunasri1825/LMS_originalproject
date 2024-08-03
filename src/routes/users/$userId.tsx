import { UserDetail } from '@/pages/users/UserDetalisPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail
})
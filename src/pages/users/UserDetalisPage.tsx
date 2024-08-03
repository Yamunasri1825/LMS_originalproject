import { useParams } from '@tanstack/react-router'

export function UserDetail() {
  const { userId } = useParams({ from: '/users/$userId' })
  return <h1>User Detail for {userId}</h1>
}
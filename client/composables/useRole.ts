import { useAuthStore } from '@/stores/auth'

export const useRole = (role: string) => {
  const authStore = useAuthStore()
  return computed(() => authStore.is(role))
}

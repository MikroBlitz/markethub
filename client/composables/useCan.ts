import { useAuthStore } from '@/stores/auth'

export const useCan = (permission: string) => {
  const authStore = useAuthStore()
  return computed(() => authStore.can(permission))
}

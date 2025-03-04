import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  actions: {
    setUser(user: User, token: string) {
      this.user = { ...user } // ✅ Ensure reactivity
      this.token = token
    },

    logout() {
      this.user = null
      this.token = null
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  persist: true, // ✅ Enables localStorage persistence
})

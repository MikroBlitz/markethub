import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";


interface User {
    name: string;
    email: string;
  }

export const useAuthStore = defineStore("auth", {
    state: () => ({
    user: useStorage<User | null>("user", null),
    token: useStorage<string | null>("token", null),
  }),

  actions: {
    setUser(user: User, token: string) {
        this.user = { ...user }; // ✅ Ensure reactivity
        this.token = token; // ✅ No need to manually store token in localStorage (useStorage does this)
      },
    

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

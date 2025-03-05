import { defineStore } from "pinia";
interface User {
    name: string;
    email: string;
}

export const useAuthStore = defineStore("auth", {
    actions: {
        logout() {
            this.user = null;
            this.token = null;

            navigateTo("/login");
        },

        setUser(user: User, token: string) {
            this.user = { ...user };
            this.token = token;
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    persist: true,

    state: () => ({
        token: null as string | null,
        user: null as User | null,
    }),
});

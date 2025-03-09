import { useFetch } from "#app";
import { defineStore } from "pinia";

import type { User } from "~/types/codegen/graphql";
import type { FormState, LoginResponse } from "~/types/authTypes";

export const useAuthStore = defineStore("auth", {
    actions: {
        async login(formState: FormState) {
            const config = useRuntimeConfig();
            const { data, error } = await useFetch<LoginResponse>(
                `${config.public.API_URL}/api/login`,
                {
                    body: JSON.stringify({
                        email: formState.email,
                        password: formState.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                },
            );

            if (error.value) throw new Error(error.value.data.message);
            if (!data.value) return;
            if (data.value.token) {
                this.setUser(data.value.user, data.value.token);
                navigateTo("/dashboard");
            }
        },

        async logout() {
            const config = useRuntimeConfig();
            const { data, error } = await useFetch(
                `${config.public.API_URL}/api/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                },
            );

            if (error.value) {
                console.error("Logout Error:", error.value);
                throw new Error(error.value.data?.message || "Logout failed");
            }
            if (!data.value) return;
            this.user = null;
            this.token = null;
            navigateTo("/");
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

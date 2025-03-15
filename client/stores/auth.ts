import { useFetch } from "#app";
import { defineStore } from "pinia";

import type { FormState, LoginResponse } from "~/types/authTypes";
interface User {
    name: string;
    email: string;
}

export const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref<string | null>(null);
        const user = ref<User | null>(null);

        async function login(formState: FormState) {
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
                setUser(data.value.user, data.value.token);
                navigateTo("/dashboard");
            }
        }

        async function logout() {
            const config = useRuntimeConfig();
            const { data, error } = await useFetch(
                `${config.public.API_URL}/api/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
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
            resetUser();
            navigateTo("/");
        }

        function setUser(userData: User, userToken: string) {
            user.value = { ...userData };
            token.value = userToken;
        }

        function resetUser() {
            user.value = null;
            token.value = null;
        }

        const isAuthenticated = computed(() => !!token.value);

        return {
            isAuthenticated,
            login,
            logout,
            token,
            user,
        };
    },
    {
        persist: true,
    },
);

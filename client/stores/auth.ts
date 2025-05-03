import { defineStore } from "pinia";

import type { FormState } from "~/types/global";
import type { User } from "~/types/codegen/graphql";

import { authContext, parseGraphQLError } from "~/utils/helpers";
import { login as LoginAuth, logout as LogoutAuth } from "~/graphql/Auth";

export const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref<string | null>(null);
        const user = ref<User | null>(null);

        async function login(formState: FormState) {
            const { mutate } = useMutation(LoginAuth);
            try {
                const response = await mutate({
                    email: formState.email,
                    password: formState.password,
                });
                const result = response?.data?.login;
                if (!result) throw new Error("Invalid response from server");

                setUser(result.user, result.token);
                navigateTo("/dashboard");
            } catch (e) {
                console.log(e);
                throw new Error(parseGraphQLError(e));
            }
        }

        async function logout() {
            try {
                const { mutate } = useMutation(LogoutAuth, authContext());
                const response = await mutate();
                if (response?.data?.logout?.message) {
                    resetUser();
                    navigateTo("/");
                }
            } catch (e) {
                throw new Error(parseGraphQLError(e));
            }
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

        const is = (roleName: string) => {
            return (
                user.value?.roles?.some(
                    (role) =>
                        role?.name.toLowerCase() === roleName.toLowerCase(),
                ) ?? false
            );
        };

        const can = (permissionName: string) => {
            if (is("Admin")) return true;

            return (
                user.value?.permissions?.some(
                    (permission) =>
                        permission.name.toLowerCase() ===
                        permissionName.toLowerCase(),
                ) ?? false
            );
        };

        return {
            can,
            is,
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

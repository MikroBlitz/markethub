<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
// import { useRouter } from "vue-router";
import { useFetch } from "#app";

// Define interfaces for API response
interface LoginResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

interface FormState {
    email: string;
    password: string;
    rememberMe: boolean;
}
const formState = reactive<FormState>({
    email: "admin@mail.com",
    password: "admin1234",
    rememberMe: false,
});

// const email = ref<string>("");
// const password = ref<string>("");
const isLoading = ref<boolean>(false);
const errorMessage = ref<string>("");
// const router = useRouter();
const authStore = useAuthStore();

const login = async (): Promise<void> => {
    if (!formState.email || !formState.password) {
        errorMessage.value = "Email and password are required";
        return;
    }

    isLoading.value = true;
    errorMessage.value = "";

    try {
        const { data, error } = await useFetch<LoginResponse>(
            "http://localhost:8000/api/login",
            {
                body: JSON.stringify({
                    email: formState.email,
                    password: formState.password,
                }),
                headers: { "Content-Type": "application/json" },
                method: "POST",
            },
        );

        if (error.value) throw new Error(error.value.message);

        if (data.value?.token) {
            authStore.setUser(data.value.user, data.value.token);
            navigateTo("/dashboard");
        } else {
            errorMessage.value = "Invalid email or password";
        }
    } catch (err) {
        errorMessage.value =
            err instanceof Error
                ? err.message
                : "Login failed. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <UCard class="w-full max-w-md">
            <template #header>
                <div class="text-center mb-4">
                    <h1 class="text-2xl font-bold">
                        Welcome to <span class="text-primary">MarketHub</span>
                    </h1>
                    <p class="text-gray-500 mt-2">Sign in to your account</p>
                </div>
            </template>

            <UForm :state="formState" @submit="login">
                <UFormGroup label="Email" name="email">
                    <UInput
                        v-model="formState.email"
                        placeholder="Enter your email"
                        type="email"
                        autocomplete="email"
                        icon="i-heroicons-envelope"
                        required
                    />
                </UFormGroup>

                <UFormGroup label="Password" name="password" class="mt-4">
                    <UInput
                        v-model="formState.password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="current-password"
                        icon="i-heroicons-lock-closed"
                        required
                    />
                </UFormGroup>

                <div class="flex items-center justify-between mt-4">
                    <UCheckbox
                        v-model="formState.rememberMe"
                        label="Remember me"
                        name="remember"
                    />
                    <UButton
                        to="/forgot-password"
                        variant="link"
                        color="primary"
                    >
                        Forgot password?
                    </UButton>
                </div>

                <UButton
                    type="submit"
                    block
                    color="primary"
                    class="mt-6"
                    :loading="isLoading"
                    :disabled="!formState.email || !formState.password"
                >
                    Sign in
                </UButton>
            </UForm>

            <template #footer>
                <div class="text-center">
                    <p class="text-gray-600">
                        Don't have an account?
                        <UButton to="/register" variant="link" color="primary">
                            Create an account
                        </UButton>
                    </p>

                    <UDivider label="Or continue with" class="my-4" />

                    <div class="flex justify-center space-x-4 mt-4">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-google"
                            aria-label="Continue with Google"
                        />
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-facebook"
                            aria-label="Continue with Facebook"
                        />
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-apple"
                            aria-label="Continue with Apple"
                        />
                    </div>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

const login = () => {
    if (!email.value || !password.value) {
        return;
    }

    isLoading.value = true;

    // Simulate API call
    setTimeout(() => {
        isLoading.value = false;
        navigateTo("/dashboard");
    }, 1000);
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

            <UForm @submit="login">
                <UFormGroup label="Email" name="email">
                    <UInput
                        v-model="email"
                        placeholder="Enter your email"
                        type="email"
                        autocomplete="email"
                        icon="i-heroicons-envelope"
                        required
                    />
                </UFormGroup>

                <UFormGroup label="Password" name="password" class="mt-4">
                    <UInput
                        v-model="password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="current-password"
                        icon="i-heroicons-lock-closed"
                        required
                    />
                </UFormGroup>

                <div class="flex items-center justify-between mt-4">
                    <UCheckbox
                        v-model="rememberMe"
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
                    :disabled="!email || !password"
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

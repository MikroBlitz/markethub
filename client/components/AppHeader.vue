<template>
    <header class="bg-card border-b border-gray-200 p-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center space-x-4">
                <UInput
                    icon="i-heroicons-magnifying-glass"
                    placeholder="Search..."
                    color="gray"
                    variant="outline"
                    class="hidden md:block w-64"
                />

                <UButton
                    icon="i-heroicons-bell"
                    color="gray"
                    variant="ghost"
                    :trailing="false"
                />

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark
                                ? 'i-heroicons-moon-20-solid'
                                : 'i-heroicons-sun-20-solid'
                        "
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-8 h-8" />
                    </template>
                </ClientOnly>

                <UDropdown :items="userMenuItems">
                    <UAvatar
                        src="https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
                        size="sm"
                        class="cursor-pointer"
                    />
                </UDropdown>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/core";

defineEmits(["toggle-sidebar"]);

const auth = useAuthStore();
const toast = useToast();

const userMenuItems = [
    [
        { icon: "i-heroicons-user-circle", label: "Profile", to: "/dashboard" },
        { icon: "i-heroicons-cog-6-tooth", label: "Settings", to: "/settings" },
    ],
    [
        {
            click: () => {
                auth.logout();
                useTimeoutFn(() => {
                    toast.add({
                        icon: "i-mdi-check-circle-outline",
                        title: "Logged out successfully",
                    });
                }, 1000);
            },
            icon: "i-heroicons-arrow-right-on-rectangle",
            label: "Logout",
        },
    ],
];

const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>

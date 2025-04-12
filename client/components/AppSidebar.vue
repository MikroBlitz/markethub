<template>
    <div>
        <USlideover
            v-model:open="isOpen"
            side="left"
            :close="{
                color: 'error',
                variant: 'outline',
                class: 'rounded-full',
            }"
            title="MarketHub"
        >
            <UButton
                icon="i-heroicons-bars-3"
                variant="ghost"
                color="primary"
                class="w-full justify-start hover:scale-110 transition-all duration-300"
                @click="isOpen = true"
            />

            <template #content>
                <div
                    class="px-4 py-5 border-b border-gray-200 dark:border-gray-800"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <UIcon
                                name="i-heroicons-shopping-bag"
                                class="h-6 w-6 text-green-600"
                            />
                            <h2
                                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
                            >
                                MarketHub
                            </h2>
                        </div>
                        <UButton
                            icon="i-heroicons-x-mark"
                            variant="soft"
                            color="error"
                            size="sm"
                            class="rounded-full"
                            aria-label="Close sidebar"
                            @click="isOpen = false"
                        />
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-4">
                    <nav class="space-y-3">
                        <div>
                            <USeparator
                                label="MAIN MENU"
                                label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                            />
                            <ul class="mt-2 space-y-1">
                                <li
                                    v-for="(item, index) in mainMenuItems"
                                    :key="index"
                                >
                                    <UButton
                                        :icon="item.icon"
                                        :to="item.to"
                                        :color="
                                            isActive(item.to)
                                                ? 'primary'
                                                : 'neutral'
                                        "
                                        :variant="
                                            isActive(item.to) ? 'soft' : 'ghost'
                                        "
                                        class="w-full justify-start"
                                        square
                                        padded
                                        @click="isOpen = false"
                                    >
                                        {{ item.label }}
                                    </UButton>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <USeparator
                                label="MANAGEMENT"
                                label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                            />
                            <ul class="mt-2 space-y-1">
                                <li
                                    v-for="(item, index) in managementItems"
                                    :key="index"
                                >
                                    <UButton
                                        :icon="item.icon"
                                        :to="item.to"
                                        :color="
                                            isActive(item.to)
                                                ? 'primary'
                                                : 'neutral'
                                        "
                                        :variant="
                                            isActive(item.to) ? 'soft' : 'ghost'
                                        "
                                        class="w-full justify-start"
                                        square
                                        padded
                                        @click="isOpen = false"
                                    >
                                        {{ item.label }}
                                    </UButton>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <USeparator
                                label="ADMIN"
                                label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                            />
                            <ul class="mt-2 space-y-1">
                                <li
                                    v-for="(item, index) in adminItems"
                                    :key="index"
                                >
                                    <UButton
                                        :icon="item.icon"
                                        :to="item.to"
                                        :color="
                                            isActive(item.to)
                                                ? 'primary'
                                                : 'neutral'
                                        "
                                        :variant="
                                            isActive(item.to) ? 'soft' : 'ghost'
                                        "
                                        class="w-full justify-start"
                                        square
                                        padded
                                        @click="isOpen = false"
                                    >
                                        {{ item.label }}
                                    </UButton>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-800">
                    <UDropdownMenu :items="userMenuItems">
                        <UAvatar src="https://github.com/nuxt.png" size="lg" />

                        <div class="pl-2 flex flex-col items-start">
                            <span class="text-sm font-medium">{{
                                authStore.user?.name
                                    ? authStore.user?.name
                                    : "No Name"
                            }}</span>
                            <span class="text-xs text-gray-500">{{
                                authStore.user?.email || "No Email"
                            }}</span>
                        </div>
                    </UDropdownMenu>
                </div>
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/core";

const isOpen = ref(false);
const route = useRoute();
const toast = useToast();

const authStore = useAuthStore();

const mainMenuItems = [
    { icon: "i-heroicons-home", label: "Dashboard", to: "/dashboard" },
    { icon: "i-heroicons-shopping-bag", label: "Products", to: "/products" },
    { icon: "i-heroicons-shopping-cart", label: "Orders", to: "/orders" },
];

const managementItems = [
    { icon: "i-heroicons-users", label: "Customers", to: "/customers" },
    { icon: "i-heroicons-chart-bar", label: "Analytics", to: "/analytics" },
    { icon: "i-heroicons-cog-6-tooth", label: "Settings", to: "/settings" },
];

const adminItems = [
    { icon: "mdi:user-group-outline", label: "Users", to: "/users" },
    { icon: "mdi:user-key-outline", label: "Roles", to: "/roles" },
    {
        icon: "mdi:user-lock-outline",
        label: "Permissions",
        to: "/permissions",
    },
];

const userMenuItems = [
    [
        { icon: "i-heroicons-user-circle", label: "Profile", to: "/dashboard" },
        { icon: "i-heroicons-cog-6-tooth", label: "Settings", to: "/settings" },
    ],
    [
        {
            icon: "i-heroicons-arrow-right-on-rectangle",
            label: "Logout",
            onClick: () => {
                authStore.logout();
                useTimeoutFn(() => {
                    toast.add({
                        icon: "i-mdi-check-circle-outline",
                        title: "Logged out successfully",
                    });
                }, 500);
            },
        },
    ],
];

const isActive = (path: string) => {
    return route.path === path;
};
</script>

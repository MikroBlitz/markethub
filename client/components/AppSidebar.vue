<template>
    <div>
        <UButton
            icon="i-heroicons-bars-3"
            variant="ghost"
            color="green"
            class="w-full justify-start"
            @click="isOpen = true"
        >
            <USlideover
                v-model="isOpen"
                :overlay="true"
                side="left"
                :ui="{
                    width: 'w-64 max-w-xs',
                    background: 'bg-white dark:bg-gray-900',
                    border: 'border-r border-gray-200 dark:border-gray-800',
                    shadow: 'shadow-xl',
                }"
            >
                <div class="flex flex-col h-full">
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
                                variant="ghost"
                                color="gray"
                                size="sm"
                                class="rounded-full"
                                aria-label="Close sidebar"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto p-4">
                        <nav class="space-y-6">
                            <div>
                                <UDivider
                                    label="MAIN MENU"
                                    label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                                />
                                <ul class="mt-3 space-y-1">
                                    <li
                                        v-for="(item, index) in mainMenuItems"
                                        :key="index"
                                    >
                                        <UButton
                                            :icon="item.icon"
                                            :to="item.to"
                                            :color="
                                                isActive(item.to)
                                                    ? 'green'
                                                    : 'gray'
                                            "
                                            :variant="
                                                isActive(item.to)
                                                    ? 'soft'
                                                    : 'ghost'
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
                                <UDivider
                                    label="MANAGEMENT"
                                    label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                                />
                                <ul class="mt-3 space-y-1">
                                    <li
                                        v-for="(item, index) in managementItems"
                                        :key="index"
                                    >
                                        <UButton
                                            :icon="item.icon"
                                            :to="item.to"
                                            :color="
                                                isActive(item.to)
                                                    ? 'green'
                                                    : 'gray'
                                            "
                                            :variant="
                                                isActive(item.to)
                                                    ? 'soft'
                                                    : 'ghost'
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

                    <div
                        class="border-t border-gray-200 dark:border-gray-800 py-2 px-4"
                    >
                        <UButton
                            block
                            color="gray"
                            variant="ghost"
                            class="justify-start"
                        >
                            <template #leading>
                                <UAvatar
                                    src="/api/placeholder/40/40"
                                    alt="User"
                                    size="sm"
                                />
                            </template>
                            <div class="flex flex-col items-start">
                                <span class="text-sm font-medium"
                                    >Admin User</span
                                >
                                <span class="text-xs text-gray-500"
                                    >admin@markethub.com</span
                                >
                            </div>
                        </UButton>
                    </div>
                </div>
            </USlideover>
        </UButton>
    </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const route = useRoute();

const mainMenuItems = [
    { icon: "i-heroicons-home", label: "Dashboard", to: "/" },
    { icon: "i-heroicons-shopping-bag", label: "Products", to: "/products" },
    { icon: "i-heroicons-shopping-cart", label: "Orders", to: "/orders" },
];

const managementItems = [
    { icon: "i-heroicons-users", label: "Customers", to: "/customers" },
    { icon: "i-heroicons-chart-bar", label: "Analytics", to: "/analytics" },
    { icon: "i-heroicons-cog-6-tooth", label: "Settings", to: "/settings" },
];

const isActive = (path: string) => {
    return route.path === path;
};
</script>

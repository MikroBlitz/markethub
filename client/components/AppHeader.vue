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
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
defineEmits(["toggle-sidebar"]);

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

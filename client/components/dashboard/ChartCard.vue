<template>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
                <h3 class="text-base font-medium">{{ title }}</h3>
                <USelectMenu
                    v-model="selectedPeriod"
                    :options="periodOptions"
                />
            </div>
        </template>

        <div class="h-64">
            <!-- Chart placeholder -->
            <div
                class="h-full w-full flex items-center justify-center bg-gray-50 rounded-lg"
            >
                <p class="text-gray-400 text-sm">
                    Chart visualization would be rendered here
                </p>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
    title: {
        default: "Sales Overview",
        type: String,
    },
});

const selectedPeriod = ref("week");
const periodOptions = [
    { label: "Last 7 days", value: "week" },
    { label: "Last 30 days", value: "month" },
    { label: "Last quarter", value: "quarter" },
    { label: "Last year", value: "year" },
];
</script>

<template>
    <div>
        <div class="flex py-3 items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter data..." />
            <div>
                <UButton variant="ghost" @click="addItem">
                    <Icon name="mdi-add" size="20" />
                </UButton>
                <UButton size="xs" variant="ghost" @click="refetch">
                    <Icon name="mdi-refresh" class="text-blue-600" size="20" />
                </UButton>
            </div>
        </div>

        <UTable
            :loading="loading"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :rows="paginatedRows"
            :columns="columns"
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
        />

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :total="totalFilteredRows" :page-count="pageCount" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyObject } from "~/types/global";

const props = defineProps({
    addItem: { type: Function as PropType<() => void>, default: () => {} },
    data: { type: Array as PropType<AnyObject[]>, required: true, default: () => [] },
    loading: { type: Boolean, default: false },
    refetch: { type: Function as PropType<() => void>, default: () => {} },
});

const q = ref("");
const page = ref(1);
const pageCount = ref(10);

// Ensure we map columns correctly
const columns = computed(() => {
    if (!props.data.length) return [];
    const keys = Object.keys(props.data[0]).filter((key) => key !== "__typename");
    return keys.map((key) => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }));
});

// Filtering rows based on user input
const filteredRows = computed(() => {
    if (!q.value) return props.data;
    return props.data.filter((val) =>
        Object.values(val).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
    );
});

// Pagination logic
const paginatedRows = computed(() => {
    const start = (page.value - 1) * pageCount.value;
    return filteredRows.value.slice(start, start + pageCount.value);
});

const totalFilteredRows = computed(() => filteredRows.value.length);

// Reset pagination when filtering
watch(q, () => (page.value = 1));
</script>

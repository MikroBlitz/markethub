<template>
    <div>
        <div
            class="flex py-3 items-center justify-between border-b border-gray-200 dark:border-gray-700"
        >
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
            :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: 'Loading...',
            }"
            :rows="filteredRows"
            :columns="columns"
            :empty-state="{
                icon: 'i-heroicons-circle-stack-20-solid',
                label: 'No items.',
            }"
        />

        <div
            class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
            <UPagination
                v-model="page"
                :page-count="pageCount"
                :total="totalFilteredRows"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyObject } from "~/types/global";

const props = defineProps({
    addItem: {
        default: () => () => {},
        required: false,
        type: Function as PropType<(...args: any[]) => void>,
    },
    data: {
        default: () => [],
        required: true,
        type: Array as PropType<AnyObject[]>,
    },
    loading: {
        default: () => false,
        required: false,
        type: Boolean as PropType<boolean>,
    },
    refetch: {
        default: () => {},
        required: false,
        type: Function as PropType<(...args: any[]) => void>,
    },
});

const q = ref("");
const page = ref(1);
const pageCount = 10;

const columns = computed(() => {
    if (!props.data || props.data.length === 0) return [];
    const keys = Object.keys(props.data[0] || {}).filter(
        (key) => key !== "__typename",
    );

    const sortedKeys = keys.includes("id")
        ? ["id", ...keys.filter((key) => key !== "id")]
        : keys;

    return sortedKeys.map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
});

const filteredRows = computed(() => {
    const filtered = q.value
        ? props.data.filter((val) =>
              Object.values(val).some((value) =>
                  String(value).toLowerCase().includes(q.value.toLowerCase()),
              ),
          )
        : props.data;

    return filtered.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const totalFilteredRows = computed(() => {
    return q.value
        ? props.data.filter((val) =>
              Object.values(val).some((value) =>
                  String(value).toLowerCase().includes(q.value.toLowerCase()),
              ),
          ).length
        : props.data.length;
});
</script>

<template>
    <div class="flex flex-col items-center py-2 justify-center">
        <div class="w-full max-w-[1400px] border-t rounded-lg">
            <DataTable
                v-model:selected-rows="selectedRows"
                v-model:sort="sort"
                v-model:page="page"
                v-model:page-count="pageCount"
                v-model:search="search"
                v-model:selected-status="selectedStatus"
                v-model:selected-columns="selectedColumns"
                :columns="columns"
                :data="data"
                :loading="loading"
                :actions="actions"
                :filters="todoStatus"
                :total-items="pageTotal"
                @reset-filters="resetFilters"
                @select="select"
            >
                <template #header>
                    <h2
                        class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
                    >
                        Users
                    </h2>
                </template>

                <template #completed-data="{ row }">
                    <UBadge
                        size="xs"
                        :label="row.completed ? 'Completed' : 'In Progress'"
                        :color="row.completed ? 'emerald' : 'orange'"
                        variant="subtle"
                    />
                </template>

                <template #actions-data="{ row }">
                    <UButton
                        v-if="!row.completed"
                        icon="i-heroicons-check"
                        size="2xs"
                        color="emerald"
                        variant="outline"
                        :ui="{ rounded: 'rounded-full' }"
                        square
                    />

                    <UButton
                        v-else
                        icon="i-heroicons-arrow-path"
                        size="2xs"
                        color="orange"
                        variant="outline"
                        :ui="{ rounded: 'rounded-full' }"
                        square
                    />
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from "@vueuse/shared";

import { usersPaginate } from "~/graphql/User";

import DataTable from "./DataTable.vue";

// Define proper interface for columns
interface Column {
    key: string;
    label?: string;
    class?: string;
    sortable?: boolean;
}

// Define interface for user data
interface User {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    completed?: boolean;
}

const columns: Column[] = [
    {
        class: "w-2",
        key: "select",
    },
    {
        key: "id",
        label: "#",
        sortable: true,
    },
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "email",
        label: "Email",
        sortable: true,
    },
    {
        key: "is_active",
        label: "Status",
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];
const selectedColumns = ref(columns);

// Selected Rows
const selectedRows = ref<User[]>([]);

function select(row: User) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

// Actions
const actions = [
    [
        {
            icon: "i-heroicons-check",
            key: "completed",
            label: "Completed",
        },
    ],
    [
        {
            icon: "i-heroicons-arrow-path",
            key: "uncompleted",
            label: "In Progress",
        },
    ],
];

// Filters
const todoStatus = [
    {
        key: 0,
        label: "Inactive",
        value: false,
    },
    {
        key: 1,
        label: "Active",
        value: true,
    },
];

const search = ref("");
const selectedStatus = ref([]);
const searchStatus = computed(() => {
    if (selectedStatus.value?.length === 0) {
        return "";
    }

    if (selectedStatus.value?.length > 1) {
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
    }

    return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
    search.value = "";
    selectedStatus.value = [];
};

const data = ref<User[]>([]);
const loading = ref(true);
const result = ref({
    usersPaginate: { data: [], paginatorInfo: { total: 0 } },
});

const fetchData = async () => {
    try {
        loading.value = true;

        const queryResult = await useAsyncQuery(usersPaginate, {
            first: Number(pageCount.value),
            page: page.value,
        });

        if (queryResult.data.value) {
            result.value = queryResult.data.value;
            data.value = result.value.usersPaginate.data;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        useTimeoutFn(() => (loading.value = false), 500);
    }
};

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => {
    if (!result.value?.usersPaginate?.paginatorInfo) {
        return 0;
    }
    return result.value.usersPaginate.paginatorInfo.total;
});

watch(
    [page, pageCount, sort],
    () => {
        fetchData();
    },
    { deep: true },
);

onMounted(() => {
    fetchData();
});

definePageMeta({
    layout: "app-layout",
});
</script>

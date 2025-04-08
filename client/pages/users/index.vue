<template>
    <div class="flex flex-col items-center py-4 justify-center">
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
import { usersPaginate } from "~/graphql/User";

import DataTable from "./DataTable.vue";

const columns = [
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
const selectedRows = ref([]);

function select(row) {
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

    if (selectedStatus?.value?.length > 1) {
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
    }

    return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
    search.value = "";
    selectedStatus.value = [];
};

const data = ref([]);
const { loading, refetch, result } = useQuery(usersPaginate, {
    first: 10,
    page: 1,
});

const fetchData = async () => {
    try {
        loading.value = true;
        const res = await result.value;
        data.value = res.usersPaginate.data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

definePageMeta({
    layout: "app-layout",
});

// Pagination
const sort = ref({ column: "id", direction: "asc" as const });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => {
    const res = result.value;
    return res.usersPaginate.paginatorInfo.total;
});
</script>

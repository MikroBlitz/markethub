<template>
    <div class="flex flex-col items-center py-2 justify-center">
        <div class="w-full max-w-[1400px] border-t rounded-lg">
            <TableData
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
                :filters="status"
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

                <template #actions-data="{ row }">
                    <div class="flex gap-1 items-center">
                        <UButton
                            v-for="(action, index) in actions"
                            :key="index"
                            :icon="action.icon"
                            size="2xs"
                            :color="action.color"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            @click="action.onClick(row)"
                        />
                    </div>
                </template>
            </TableData>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from "@vueuse/shared";

import type { User, UsersPaginateQuery } from "~/types/codegen/graphql";

import { usersPaginate } from "~/graphql/User";
import { columns, status } from "~/pages/users/columns";
const selectedColumns = ref(columns);
const selectedRows = ref<User[]>([]);

function select(row: User) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => {
    if (!result.value?.usersPaginate?.paginatorInfo) return 0;
    return result.value.usersPaginate.paginatorInfo.total;
});
const search = ref("");
const selectedStatus = ref([]);
const searchStatus = computed(() => {
    if (selectedStatus.value?.length === 0) return "";
    if (selectedStatus.value?.length > 1)
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;

    return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
    search.value = "";
    selectedStatus.value = [];
};

const data = ref<User[]>([]);
const loading = ref(false);
const result = ref({ usersPaginate });

const fetchData = async () => {
    try {
        loading.value = true;

        const queryResult = await useAsyncQuery(usersPaginate, {
            first: Number(pageCount.value),
            page: page.value,
        });

        if (queryResult.data.value) {
            result.value = queryResult.data.value as UsersPaginateQuery;
            data.value = result.value.usersPaginate.data;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        useTimeoutFn(() => (loading.value = false), 500);
    }
};

const actions = [
    {
        color: "emerald",
        icon: "mdi:pencil",
        onClick: (row) => {
            console.log("Edit", row);
        },
    },
    {
        color: "red",
        icon: "mdi:delete",
        onClick: (row) => {
            console.log("Delete", row);
        },
    },
];

watch(
    [page, pageCount, sort],
    () => {
        fetchData();
    },
    { deep: true },
);

onBeforeMount(() => fetchData());
onMounted(() => fetchData());

definePageMeta({
    layout: "app-layout",
});
</script>

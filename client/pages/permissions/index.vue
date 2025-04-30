<template>
    <div class="flex flex-col items-center py-2 justify-center">
        <div
            class="w-full max-w-[1400px] border border-gray-100 dark:border-gray-700 rounded-lg"
        >
            <TableData
                v-model:selected-rows="selectedRows"
                v-model:sort="sort"
                v-model:page="page"
                v-model:page-count="pageCount"
                v-model:search="search"
                v-model:selected-status="selectedFilters"
                v-model:selected-columns="selectedColumns"
                :columns="columns"
                :data="data"
                :loading="loading"
                :filters="filter"
                :total-items="pageTotal"
                @reset-filters="resetFilters"
                @select="select"
            >
                <template #header>
                    <div class="flex w-full items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Icon
                                name="mdi:user-key-outline"
                                class="text-gray-900 dark:text-emerald-500"
                                size="40"
                            />
                            <h2
                                class="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight"
                            >
                                Permission
                            </h2>
                        </div>
                        <UTooltip text="Add Permission">
                            <UButton
                                class="p-2 rounded-full group"
                                @click="openAddModal"
                            >
                                <UIcon
                                    name="mdi:add"
                                    class="group-hover:scale-150 transition-all duration-300"
                                />
                            </UButton>
                        </UTooltip>
                    </div>
                </template>

                <template #actions-data="{ row }">
                    <div class="flex items-center gap-1">
                        <div v-for="(action, index) in actions" :key="index">
                            <UTooltip :text="action.tooltip(row)">
                                <UButton
                                    size="2xs"
                                    :color="action.color(row)"
                                    variant="ghost"
                                    square
                                    @click="action.onClick(row)"
                                >
                                    <Icon
                                        :name="action.icon(row)"
                                        size="22"
                                        class="hover:scale-125 transition-all duration-300"
                                    />
                                </UButton>
                            </UTooltip>
                        </div>
                    </div>
                </template>
            </TableData>
        </div>

        <!-- Form -->
        <FormModal
            v-model:is-open="isOpen"
            :on-submit="onSubmit"
            :loading="loading"
        />

        <!-- Delete Modal -->
        <ModalConfirm
            v-model:is-open="isDeleteModal"
            :loading="loading"
            label="Delete"
            description="Are you sure you want to delete this permission?"
            icon="i-heroicons-exclamation-triangle"
            :action="() => removePermission(selectedPermission.id)"
            color="red"
        />
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { useDebounce, useTimeoutFn } from "@vueuse/shared";

import type {
    Permission,
    PermissionsPaginateQuery,
} from "~/types/codegen/graphql";

import { type Schema, formState } from "~/pages/roles/data/schema";
import FormModal from "~/pages/permissions/components/FormModal.vue";
import {
    permissionsPaginate,
    upsertPermission,
    deletePermission,
} from "~/graphql/Permission";

import { columns, filter } from "./data/columns";

const toast = useToast();
const selectedColumns = ref(columns);
const selectedRows = ref<Permission[]>([]);

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedFilters = ref([]);
const debouncedSearch = useDebounce(search, 500);

const pageTotal = computed(() => {
    if (!result.value?.permissionsPaginate?.paginatorInfo) return 0;
    return result.value.permissionsPaginate.paginatorInfo.total;
});

const data = ref<Permission[]>([]);
const loading = ref(false);
const result = ref({ permissionsPaginate });

const fetchData = async () => {
    try {
        loading.value = true;
        const variables: Record<string, any> = {
            first: Number(pageCount.value),
            page: page.value,
        };
        if (search.value) variables.search = search.value;
        if (sort.value) variables.sort = sort.value;

        const queryResult = await useAsyncQuery(permissionsPaginate, variables);
        if (queryResult.data.value) {
            result.value = queryResult.data.value as PermissionsPaginateQuery;
            data.value = result.value.permissionsPaginate.data;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        useTimeoutFn(() => (loading.value = false), 500);
    }
};

const resetFilters = () => {
    search.value = "";
    selectedFilters.value = [];
    sort.value = { column: "id", direction: "asc" as "asc" | "desc" };
};

function select(row: Permission) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

const isOpen = ref(false);
const isDeleteModal = ref(false);
const selectedPermission = ref<Permission | null>(null);

function openAddModal() {
    Object.assign(formState, {
        guard_name: "",
        name: "",
    });
    isOpen.value = true;
}

function openEditModal(permission: Permission) {
    selectedPermission.value = permission;
    Object.assign(formState, {
        guard_name: permission.guard_name,
        name: permission.name,
    });
    isOpen.value = true;
}

function openDeleteModal(permission: Permission) {
    selectedPermission.value = permission;
    isDeleteModal.value = true;
}

const { mutate: savePermission } = useMutation(upsertPermission);
const { mutate: removePermissionMutation } = useMutation(deletePermission);

async function removePermission(id: string) {
    try {
        loading.value = true;
        await removePermissionMutation({ id });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Permission has been removed",
        });
    } catch (err) {
        console.error("Remove error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error removing Permission: ${err.message}`,
        });
    } finally {
        await fetchData();
        useTimeoutFn(() => (loading.value = false), 700);
        isDeleteModal.value = false;
    }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const input = {
        ...event.data,
        guard_name: "web",
        id: selectedPermission.value?.id || undefined,
    };

    try {
        loading.value = true;
        await savePermission({ input });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Permission has been saved",
        });
    } catch (err) {
        console.error("Save error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error saving permission: ${err.message}`,
        });
    } finally {
        await fetchData();
        useTimeoutFn(() => (loading.value = false), 700);
        isOpen.value = false;
    }
}

const actions = [
    {
        color: () => "blue",
        icon: () => "mdi:pencil",
        onClick: (row: Permission) => openEditModal(row),
        tooltip: (row: Permission) => `Edit Permission ${row.name}`,
    },
    {
        color: () => "red",
        icon: () => "mdi:delete",
        onClick: (row: Permission) => openDeleteModal(row),
        tooltip: (row: Permission) => `Delete Permission ${row.name}`,
    },
];

definePageMeta({ layout: "app-layout" });
onBeforeMount(() => fetchData());
onMounted(() => fetchData());
watch([page, pageCount, sort, debouncedSearch], () => fetchData(), {
    deep: true,
});
</script>

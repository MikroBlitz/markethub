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
                :filters="status"
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
                                Roles
                            </h2>
                        </div>
                        <UTooltip text="Add Role">
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
            description="Are you sure you want to delete this role?"
            icon="i-heroicons-exclamation-triangle"
            :action="() => removeRole(selectedRole.id)"
            color="red"
        />
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { useDebounce, useTimeoutFn } from "@vueuse/shared";

import type { Role, RolesPaginateQuery } from "~/types/codegen/graphql";

import { columns, status } from "~/pages/roles/data/columns";
import FormModal from "~/pages/roles/components/FormModal.vue";
import { type Schema, formState } from "~/pages/roles/data/schema";
import { rolesPaginate, upsertRole, deleteRole } from "~/graphql/Role";

const toast = useToast();
const selectedColumns = ref(columns);
const selectedRows = ref<Role[]>([]);

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedFilters = ref([]);
const debouncedSearch = useDebounce(search, 500);

const pageTotal = computed(() => {
    if (!result.value?.rolesPaginate?.paginatorInfo) return 0;
    return result.value.rolesPaginate.paginatorInfo.total;
});

const data = ref<Role[]>([]);
const loading = ref(false);
const result = ref({ rolesPaginate });

const fetchData = async () => {
    try {
        loading.value = true;
        const variables: Record<string, any> = {
            first: Number(pageCount.value),
            page: page.value,
        };
        if (search.value) variables.search = search.value;
        if (sort.value) variables.sort = sort.value;

        const queryResult = await useAsyncQuery(rolesPaginate, variables);
        if (queryResult.data.value) {
            result.value = queryResult.data.value as RolesPaginateQuery;
            data.value = result.value.rolesPaginate.data;
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

function select(row: Role) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

const isOpen = ref(false);
const isDeleteModal = ref(false);
const selectedRole = ref<Role | null>(null);

function openAddModal() {
    Object.assign(formState, {
        guard_name: "",
        name: "",
    });
    isOpen.value = true;
}

function openEditModal(role: Role) {
    selectedRole.value = role;
    Object.assign(formState, {
        guard_name: role.guard_name,
        name: role.name,
    });
    isOpen.value = true;
}

function openDeleteModal(role: Role) {
    selectedRole.value = role;
    isDeleteModal.value = true;
}

const { mutate: saveRole } = useMutation(upsertRole);
const { mutate: removeRoleMutation } = useMutation(deleteRole);

async function removeRole(id: string) {
    try {
        loading.value = true;
        await removeRoleMutation({ id });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Role has been removed",
        });
    } catch (err) {
        console.error("Remove error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error removing role: ${err.message}`,
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
        id: selectedRole.value?.id || undefined,
    };

    try {
        loading.value = true;
        await saveRole({ input });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Role has been saved",
        });
    } catch (err) {
        console.error("Save error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error saving role: ${err.message}`,
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
        onClick: (row: Role) => openEditModal(row),
        tooltip: (row: Role) => `Edit Role ${row.name}`,
    },
    {
        color: () => "red",
        icon: () => "mdi:delete",
        onClick: (row: Role) => openDeleteModal(row),
        tooltip: (row: Role) => `Delete Role ${row.name}`,
    },
];

definePageMeta({ layout: "app-layout" });
onBeforeMount(() => fetchData());
onMounted(() => fetchData());
watch([page, pageCount, sort, debouncedSearch], () => fetchData(), {
    deep: true,
});
</script>

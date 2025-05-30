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
                :actions="actions"
                @reset-filters="resetFilters"
                @select="select"
            >
                <template #header>
                    <div class="flex w-full items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Icon
                                name="mdi:user-lock-outline"
                                class="text-gray-900 dark:text-emerald-500"
                                size="40"
                            />
                            <h2
                                class="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight"
                            >
                                Permissions
                            </h2>
                        </div>
                        <div class="flex gap-2">
                            <template v-if="auth.can('add permission')">
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
                            </template>
                            <UTooltip text="Refetch Data">
                                <UButton
                                    class="p-2 rounded-full group"
                                    variant="outline"
                                    @click="fetchData"
                                >
                                    <UIcon
                                        name="mdi:reload"
                                        class="transition-transform duration-500 group-hover:scale-150"
                                        :style="`transform: rotate(${rotationRefetch}deg);`"
                                    />
                                </UButton>
                            </UTooltip>
                        </div>
                    </div>
                </template>
            </TableData>
        </div>

        <!-- Form -->
        <ModalForm
            v-model:is-open="isOpen"
            title="Permission Form"
            :form-schema="formSchema"
            :zod-schema="zodSchema"
            :state="formState"
            :on-submit="onSubmit"
            :loading="modalLoading"
        />

        <!-- Delete Modal -->
        <ModalConfirm
            v-model:is-open="isDeleteModal"
            :loading="modalLoading"
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

import {
    type Schema,
    formState,
    schema,
} from "~/pages/permissions/data/schema";
import {
    permissionsPaginate,
    upsertPermission,
    deletePermission,
} from "~/graphql/Permission";

import { columns, filter } from "../data/columns";

const auth = useAuthStore();
const selectedColumns = ref(columns);
const selectedRows = ref<Permission[]>([]);

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedFilters = ref([]);
const debouncedSearch = useDebounce(search, 500);

const isOpen = ref(false);
const isDeleteModal = ref(false);
const selectedPermission = ref<Permission | null>(null);

const pageTotal = computed(() => {
    if (!result.value?.permissionsPaginate?.paginatorInfo) return 0;
    return result.value.permissionsPaginate.paginatorInfo.total;
});

const data = ref<Permission[]>([]);
const loading = ref(false);
const modalLoading = ref(false);
const result = ref({ permissionsPaginate });
const rotationRefetch = ref(0);
const formSchema = computed(() => schema());
const zodSchema = computed(() => formZodSchema(formSchema.value));

const fetchData = async () => {
    rotationRefetch.value += 360;
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
        useTimeoutFn(() => (loading.value = false), 300);
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
    console.log("edit mode:", permission);
}

function openDeleteModal(permission: Permission) {
    selectedPermission.value = permission;
    isDeleteModal.value = true;
}

async function removePermission(id: string) {
    const { mutate: removePermissionMutation } = useMutation(deletePermission);
    return useGraphQLMutation(
        "Permission",
        "deleted",
        loading,
        { id },
        {
            fetch: fetchData,
            modal: isDeleteModal,
            mutation: removePermissionMutation,
        },
    );
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { mutate: savePermission } = useMutation(upsertPermission);
    const input = {
        ...event.data,
        guard_name: "web",
        id: selectedPermission.value?.id || undefined,
    };

    return useGraphQLMutation(
        "Permission",
        "saved",
        modalLoading,
        { input },
        {
            fetch: fetchData,
            modal: isOpen,
            mutation: savePermission,
        },
    );
}

const actions = [
    {
        color: () => "blue",
        condition: () => auth.can("edit permission"),
        icon: () => "mdi:pencil",
        onClick: (row: Permission) => openEditModal(row),
        tooltip: (row: Permission) => `Edit Permission ${row.name}`,
    },
    {
        color: () => "red",
        condition: () => auth.can("delete permission"),
        icon: () => "mdi:delete",
        onClick: (row: Permission) => openDeleteModal(row),
        tooltip: (row: Permission) => `Delete Permission ${row.name}`,
    },
];

onBeforeMount(() => fetchData());
onMounted(() => fetchData());
watch([page, pageCount, sort, debouncedSearch], () => fetchData(), {
    deep: true,
});
</script>

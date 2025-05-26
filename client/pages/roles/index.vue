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
                        <div class="flex gap-2">
                            <template v-if="auth.can('add role')">
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

                <template #actions-data="{ row }">
                    <div class="flex items-center gap-1">
                        <div v-for="(action, index) in actions" :key="index">
                            <template v-if="action.condition()">
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
                            </template>
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
            :options="permissionOptions"
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

import { permissionsPaginate } from "~/graphql/Permission";
import { columns, status } from "~/pages/roles/data/columns";
import FormModal from "~/pages/roles/components/FormModal.vue";
import { type Schema, formState } from "~/pages/roles/data/schema";
import { rolesPaginate, upsertRole, deleteRole } from "~/graphql/Role";

const auth = useAuthStore();
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
const rotationRefetch = ref(0);

const permissionOptions = ref<{ label: string; value: string }[]>([]);
const fetchPermissions = async () => {
    try {
        const variables = { first: 100 };
        const { data } = await useAsyncQuery(permissionsPaginate, variables);

        if (data.value) {
            const permissions = data.value.permissionsPaginate.data;
            permissionOptions.value = permissions.map(
                (permission: { name: string; id: string }) => ({
                    label: permission.name,
                    value: permission.id,
                }),
            );
        }
    } catch (e) {
        console.error("Failed to fetch permissions", e);
    }
};

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

        const queryResult = await useAsyncQuery(rolesPaginate, variables);
        if (queryResult.data.value) {
            result.value = queryResult.data.value as RolesPaginateQuery;
            data.value = result.value.rolesPaginate.data;
        }
    } catch (e) {
        console.error("Error fetching users:", e);
    } finally {
        useTimeoutFn(() => (loading.value = false), 300);
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
        permissions: [],
    });
    fetchPermissions();
    isOpen.value = true;
}

function openEditModal(role: Role) {
    selectedRole.value = role;
    const permissionsIds = role.permissions
        ? role.permissions.map((permission) => permission.id)
        : [];
    Object.assign(formState, {
        guard_name: role.guard_name,
        name: role.name,
        permissions: permissionsIds,
    });
    fetchPermissions();
    isOpen.value = true;
}

function openDeleteModal(role: Role) {
    selectedRole.value = role;
    isDeleteModal.value = true;
}

async function removeRole(id: string) {
    const { mutate: removeRoleMutation } = useMutation(deleteRole);
    try {
        loading.value = true;
        await removeRoleMutation({ id });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Role has been removed",
        });
        await fetchData();
    } catch (e) {
        console.error("Remove error:", e);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error removing role: ${e.message}`,
        });
    } finally {
        loading.value = false;
        isDeleteModal.value = false;
    }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { mutate: saveRole } = useMutation(upsertRole);

    let permissions: string[] = [];
    if (event.data.permissions) {
        if (Array.isArray(event.data.permissions))
            permissions = event.data.permissions;
        else permissions = [event.data.permissions];
    }
    const input = {
        ...event.data,
        guard_name: "web",
        id: selectedRole.value?.id || undefined,
        permissions: {
            sync: permissions,
        },
    };

    try {
        loading.value = true;
        await saveRole({ input });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "Role has been saved",
        });
        await fetchData();
    } catch (e) {
        console.error("Save error:", e);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error saving role: ${e.message}`,
        });
    } finally {
        loading.value = false;
        isOpen.value = false;
    }
}

const actions = [
    {
        color: () => "blue",
        condition: () => auth.can("edit role"),
        icon: () => "mdi:pencil",
        onClick: (row: Role) => openEditModal(row),
        tooltip: (row: Role) => `Edit Role ${row.name}`,
    },
    {
        color: () => "red",
        condition: () => auth.can("delete role"),
        icon: () => "mdi:delete",
        onClick: (row: Role) => openDeleteModal(row),
        tooltip: (row: Role) => `Delete Role ${row.name}`,
    },
];

onBeforeMount(() => fetchData());
onMounted(() => fetchData());
watch([page, pageCount, sort, debouncedSearch], () => fetchData(), {
    deep: true,
});

definePageMeta({ layout: "app-layout", permission: "view role" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Roles",
});
</script>

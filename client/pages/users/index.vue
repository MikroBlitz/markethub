<template>
    <div class="flex flex-col items-center py-2 justify-center">
        <div class="w-full max-w-[1400px] border-t rounded-lg">
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
                        <div class="flex items-center gap-1">
                            <Icon name="i-heroicons-user-circle" size="30" />
                            <h2
                                class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
                            >
                                Users
                            </h2>
                        </div>
                        <UTooltip text="Add User">
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
                            <UTooltip
                                v-if="action.condition(row)"
                                :text="action.tooltip(row)"
                            >
                                <UButton
                                    v-if="action.condition(row)"
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
            description="Are you sure you want to delete this user?"
            icon="i-heroicons-exclamation-triangle"
            :action="() => removeUser(selectedUser.id)"
            color="red"
        />

        <!-- Change Active Status Modal -->
        <ModalConfirm
            v-model:is-open="isChangeStatusModal"
            :loading="loading"
            label="Switch Status"
            description="Confirm switch status?"
            icon="i-heroicons-information-circle"
            :action="() => changeStatus(selectedUser.id)"
            color="blue"
        />
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { useDebounce, useTimeoutFn } from "@vueuse/shared";

import type { User, UsersPaginateQuery } from "~/types/codegen/graphql";

import { columns, status } from "~/pages/users/data/columns";
import FormModal from "~/pages/users/components/FormModal.vue";
import { type UserSchema, userState } from "~/pages/users/data/schema";
import { usersPaginate, upsertUser, deleteUser } from "~/graphql/User";

const toast = useToast();
const selectedColumns = ref(columns);
const selectedRows = ref<User[]>([]);
const auth = useAuthStore();
const isAdmin = inject("isAdmin");

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedFilters = ref([]);
const debouncedSearch = useDebounce(search, 500);

const pageTotal = computed(() => {
    if (!result.value?.usersPaginate?.paginatorInfo) return 0;
    return result.value.usersPaginate.paginatorInfo.total;
});

const data = ref<User[]>([]);
const loading = ref(false);
const result = ref({ usersPaginate });

const fetchData = async () => {
    try {
        loading.value = true;
        const variables: Record<string, any> = {
            first: Number(pageCount.value),
            page: page.value,
        };
        if (search.value) variables.search = search.value;
        if (sort.value) variables.sort = sort.value;
        if (selectedFilters.value && selectedFilters.value.length > 0) {
            variables.filter = selectedFilters.value;
        }

        const queryResult = await useAsyncQuery(usersPaginate, variables);
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

const resetFilters = () => {
    search.value = "";
    selectedFilters.value = [];
    sort.value = { column: "id", direction: "asc" as "asc" | "desc" };
};

function select(row: User) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

const isOpen = ref(false);
const isDeleteModal = ref(false);
const isChangeStatusModal = ref(false);
const selectedUser = ref<User | null>(null);

function openAddModal() {
    Object.assign(userState, {
        email: "",
        is_active: false,
        name: "",
        password: "",
    });
    isOpen.value = true;
}

function openEditModal(user: User) {
    selectedUser.value = user;
    Object.assign(userState, {
        email: user.email,
        is_active: user.is_active,
        name: user.name,
        password: "",
    });
    isOpen.value = true;
}

function openDeleteModal(user: User) {
    selectedUser.value = user;
    isDeleteModal.value = true;
}

function openChangeStatusModal(user: User) {
    selectedUser.value = user;
    isChangeStatusModal.value = true;
}

const { mutate: saveUser } = useMutation(upsertUser);
const { mutate: removeUserMutation } = useMutation(deleteUser);

async function removeUser(id: string) {
    try {
        loading.value = true;
        if (auth.user?.id !== id) {
            await removeUserMutation({ id });
            toast.add({
                color: "green",
                icon: "i-mdi-check-circle-outline",
                title: "User has been removed",
            });
        } else {
            toast.add({
                color: "red",
                icon: "i-mdi-alert-circle-outline",
                title: "You can't remove yourself",
            });
        }
    } catch (err) {
        console.error("Remove error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error removing user: ${err.message}`,
        });
    } finally {
        await fetchData();
        useTimeoutFn(() => (loading.value = false), 700);
        isDeleteModal.value = false;
    }
}

async function changeStatus(id: string) {
    if (!selectedUser.value) return;

    const input = {
        id,
        is_active: !selectedUser.value.is_active,
    };

    try {
        loading.value = true;
        await saveUser({ input });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "User status has been updated",
        });
    } catch (err) {
        console.error("Status update error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error updating user status: ${err.message}`,
        });
    } finally {
        await fetchData();
        useTimeoutFn(() => (loading.value = false), 700);
        isChangeStatusModal.value = false;
    }
}

async function onSubmit(event: FormSubmitEvent<UserSchema>) {
    const input = {
        ...event.data,
        id: selectedUser.value?.id || undefined,
        password: event.data.password || selectedUser.value?.password,
    };

    try {
        loading.value = true;
        await saveUser({ input });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "User has been saved",
        });
    } catch (err) {
        console.error("Save error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error saving user: ${err.message}`,
        });
    } finally {
        await fetchData();
        useTimeoutFn(() => (loading.value = false), 700);
        isOpen.value = false;
    }
}

const actions = [
    {
        color: (row: User) => (row.is_active ? "green" : "orange"),
        condition: (row: User) => !row.is_admin && isAdmin.value,
        icon: (row: User) =>
            row.is_active ? "mdi:toggle-switch" : "mdi:toggle-switch-off",
        onClick: (row: User) => openChangeStatusModal(row),
        tooltip: (row: User) =>
            `Switch status to "${row.is_active ? "Inactive" : "Active"}"`,
    },
    {
        color: () => "blue",
        condition: () => true, // TODO: @can edit
        icon: () => "mdi:pencil",
        onClick: (row: User) => openEditModal(row),
        tooltip: (row: User) => `Edit User ${row.name}`,
    },
    {
        color: () => "red",
        condition: () => true, // TODO: @can delete
        icon: () => "mdi:delete",
        onClick: (row: User) => openDeleteModal(row),
        tooltip: (row: User) => `Delete User ${row.name}`,
    },
];

onBeforeMount(() => fetchData());
onMounted(() => fetchData());
watch(
    [page, pageCount, sort, debouncedSearch, selectedFilters],
    () => fetchData(),
    {
        deep: true,
    },
);

definePageMeta({ layout: "app-layout" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Users",
});
</script>

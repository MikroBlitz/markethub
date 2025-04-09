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
                    <div class="flex w-full space-x-2 items-center">
                        <UButton class="p-2 rounded-full" @click="openAddModal">
                            <UIcon name="mdi:add" />
                        </UButton>
                        <h2
                            class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
                        >
                            Users
                        </h2>
                    </div>
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

        <!-- Modal and Form -->
        <UModal v-model="isOpen">
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <div class="flex items-center mb-4">
                    <UIcon
                        name="i-heroicons-pencil-square"
                        class="mr-3 text-emerald-500 text-xl"
                    />
                    <span class="text-lg font-medium">Add/Edit User</span>
                </div>

                <UForm
                    :schema="schema"
                    :state="userState"
                    class="space-y-4"
                    @submit="onSubmit"
                >
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="userState.name" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput v-model="userState.email" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="userState.password" type="password" />
                    </UFormGroup>

                    <UFormGroup label="Active" name="is_active">
                        <UToggle v-model="userState.is_active" />
                    </UFormGroup>

                    <div class="flex justify-end gap-2">
                        <UButton
                            color="gray"
                            variant="ghost"
                            @click="isOpen = false"
                            >Cancel</UButton
                        >

                        <UButton
                            :loading="loading"
                            type="submit"
                            label="Submit"
                        />
                    </div>
                </UForm>
            </UCard>
        </UModal>

        <!--        Delete Modal -->
        <UModal v-model="isDeleteModal">
            <div class="p-4 space-y-4">
                <div class="flex items-center">
                    <UIcon
                        name="i-heroicons-exclamation-triangle"
                        class="mr-3 text-red-500 text-xl"
                    />
                    <span class="text-lg font-medium">Confirm Delete</span>
                </div>

                <p class="text-gray-600">
                    Are you sure you want to delete this user?
                </p>

                <div class="flex justify-end space-x-3 pt-3">
                    <UButton
                        color="gray"
                        variant="soft"
                        @click="isDeleteModal = false"
                    >
                        Cancel
                    </UButton>
                    <UButton
                        color="red"
                        variant="solid"
                        :loading="loading"
                        @click="removeUser(selectedUser.id)"
                    >
                        Delete User
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { useTimeoutFn } from "@vueuse/shared";

import type { User, UsersPaginateQuery } from "~/types/codegen/graphql";

import { columns, status } from "~/pages/users/columns";
import { usersPaginate, upsertUser, deleteUser } from "~/graphql/User";
import { schema, type UserSchema, userState } from "~/pages/users/schema";

const toast = useToast();
const selectedColumns = ref(columns);
const selectedRows = ref<User[]>([]);

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedStatus = ref([]);

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

const resetFilters = () => {
    search.value = "";
    selectedStatus.value = [];
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

const { mutate: saveUser } = useMutation(upsertUser);
const { mutate: removeUserMutation } = useMutation(deleteUser);

async function removeUser(id: string) {
    try {
        loading.value = true;
        await removeUserMutation({ id });
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: "User has been removed",
        });
    } catch (err) {
        console.error("Remove error:", err);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error removing user: ${err.message}`,
        });
    } finally {
        await fetchData();
        loading.value = false;
        isDeleteModal.value = false;
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
        loading.value = false;
        isOpen.value = false;
    }
}

const actions = [
    {
        color: "emerald",
        icon: "mdi:pencil",
        onClick: (row: User) => openEditModal(row),
    },
    {
        color: "red",
        icon: "mdi:delete",
        onClick: (row: User) => openDeleteModal(row),
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

definePageMeta({ layout: "app-layout" });
</script>

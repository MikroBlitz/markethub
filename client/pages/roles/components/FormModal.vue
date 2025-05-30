<template>
    <!-- Modal and Form -->
    <UModal v-model="isModalOpen">
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
                <span class="text-lg font-medium">Form</span>
            </div>

            <UForm
                :schema="schema"
                :state="formState"
                class="space-y-4"
                @submit="onSubmit"
            >
                <UFormGroup label="Role Name" name="name">
                    <UInput v-model="formState.name" />
                </UFormGroup>

                <UFormGroup label="Permissions" name="permissions">
                    <USelectMenu
                        v-model="formState.permissions"
                        :options="options"
                        placeholder="Select permissions"
                        value-attribute="value"
                        option-attribute="label"
                        multiple
                        :searchable="search"
                        :loading="loading"
                        searchable-placeholder="Search permission..."
                    >
                        <template #leading="{ optionsLoading }">
                            <UIcon
                                v-if="optionsLoading"
                                name="i-heroicons-arrow-path"
                                class="animate-spin text-gray-500"
                            />
                            <UIcon
                                v-else
                                name="mdi:shield-check"
                                class="text-gray-500"
                            />
                        </template>
                    </USelectMenu>
                </UFormGroup>

                <div class="flex justify-end gap-2">
                    <UButton
                        color="gray"
                        variant="ghost"
                        @click="isModalOpen = false"
                        >Cancel</UButton
                    >

                    <UButton :loading="loading" type="submit" label="Submit" />
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import type { Option } from "~/components/table/types";

import { schema, type Schema, formState } from "~/pages/roles/data/schema";

const props = defineProps<{
    isOpen: boolean;
    onSubmit: (event: FormSubmitEvent<Schema>) => void;
    loading: boolean;
    options: Option[];
    search: (query: string) => Promise<Option[]>;
}>();

const emit = defineEmits<{
    (e: "update:is-open", isOpen: boolean): void;
}>();

const isModalOpen = computed({
    get() {
        return props.isOpen;
    },
    set(value) {
        emit("update:is-open", value);
    },
});
</script>

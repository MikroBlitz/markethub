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
                <span
                    class="text-lg text-gray-900 dark:text-gray-100 font-medium"
                    >Form</span
                >
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

                <!--                <UFormGroup label="Active" name="is_active">-->
                <!--                    <UToggle v-model="userState.is_active" />-->
                <!--                </UFormGroup>-->

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

import { schema, type UserSchema, userState } from "~/pages/users/data/schema";

const props = defineProps<{
    isOpen: boolean;
    onSubmit: (event: FormSubmitEvent<UserSchema>) => void;
    loading: boolean;
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

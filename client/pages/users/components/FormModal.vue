<template>
    <!-- Modal and Form -->
    <UModal v-model="isModalOpen" :transition="false">
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
                class="space-y-4 gap-x-2 grid-cols-12 grid"
                @submit="onSubmit"
            >
                <UFormGroup label="Role *" name="roles" class="col-span-full">
                    <USelectMenu
                        v-model="userState.roles"
                        :options="options"
                        placeholder="Select roles"
                        value-attribute="value"
                        option-attribute="label"
                        :searchable="search"
                        searchable-placeholder="Search role..."
                    />
                </UFormGroup>

                <UFormGroup
                    label="First name *"
                    name="first_name"
                    class="col-span-full md:col-span-6"
                >
                    <UInput v-model="userState.first_name" />
                </UFormGroup>

                <UFormGroup
                    label="Middle name"
                    name="middle_name"
                    class="col-span-full md:col-span-6"
                >
                    <UInput v-model="userState.middle_name" />
                </UFormGroup>

                <UFormGroup
                    label="Last name *"
                    name="last_name"
                    class="col-span-full md:col-span-6"
                >
                    <UInput v-model="userState.last_name" />
                </UFormGroup>

                <UFormGroup
                    label="Phone"
                    name="phone"
                    class="col-span-full md:col-span-6"
                >
                    <UInput v-model="userState.phone" />
                </UFormGroup>

                <UFormGroup label="Email *" name="email" class="col-span-full">
                    <UInput v-model="userState.email" />
                </UFormGroup>

                <UFormGroup
                    label="Password *"
                    name="password"
                    class="col-span-full"
                >
                    <UInput v-model="userState.password" type="password" />
                </UFormGroup>

                <!--                <UFormGroup label="Active" name="is_active">-->
                <!--                    <UToggle v-model="userState.is_active" />-->
                <!--                </UFormGroup>-->

                <div class="flex col-span-full justify-end gap-2 pt-4">
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

import { schema, type UserSchema, userState } from "~/pages/users/data/schema";

const props = defineProps<{
    isOpen: boolean;
    onSubmit: (event: FormSubmitEvent<UserSchema>) => void;
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

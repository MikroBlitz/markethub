<template>
    <UCard
        class="w-full"
        :ui="{
            base: '',
            ring: '',
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: 'px-4 py-5' },
            body: {
                padding: '',
                base: 'divide-y divide-gray-200 dark:divide-gray-700',
            },
            footer: { padding: 'p-4' },
        }"
    >
        <template #header>
            <slot name="header">
                <h2
                    class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
                >
                    <slot name="title">Data Table</slot>
                </h2>
            </slot>
        </template>

        <div class="flex justify-between items-center w-full px-4 py-3">
            <!-- Filters -->
            <div class="flex items-center gap-1.5">
                <UButton
                    size="xs"
                    class="rounded-full p-2 mr-2"
                    variant="outline"
                    @click="navigateTo('/dashboard')"
                >
                    <Icon name="mdi:arrow-left" size="20" />
                </UButton>

                <USelectMenu
                    v-model="selectedColumns"
                    :options="excludeSelectColumn"
                    multiple
                >
                    <UButton
                        icon="i-heroicons-view-columns"
                        color="gray"
                        size="xs"
                    >
                        Columns
                    </UButton>
                </USelectMenu>

                <UButton
                    icon="i-heroicons-funnel"
                    color="gray"
                    size="xs"
                    :disabled="search === '' && selectedStatus.length === 0"
                    @click="resetFilters"
                >
                    Reset
                </UButton>
            </div>

            <div class="flex gap-1.5 items-center">
                <USelectMenu
                    v-model="selectedStatus"
                    :options="filters"
                    multiple
                    placeholder="Filters"
                    class="w-40"
                />

                <UInput
                    v-model="search"
                    icon="i-heroicons-magnifying-glass-20-solid"
                    placeholder="Search..."
                />
            </div>
        </div>

        <!-- Table -->
        <UTable
            v-model="selectedRows"
            v-model:sort="sort"
            :rows="data"
            :columns="columnsTable"
            :loading="loading"
            sort-asc-icon="i-heroicons-arrow-up"
            sort-desc-icon="i-heroicons-arrow-down"
            sort-mode="manual"
            class="w-full"
            :ui="{
                td: { base: 'max-w-[0] truncate' },
                default: { checkbox: { color: 'gray' as const } },
            }"
        >
            <!-- Dynamic cell renderer -->
            <template
                v-for="column in columnsTable"
                #[`${column.key}-data`]="{ row }"
            >
                <template v-if="column.render">
                    <component :is="getDynamicContent(column, row)" />
                </template>
            </template>

            <!-- Pass through other slots -->
            <template v-for="(_, slot) in $slots" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
            </template>

            <template #loading-state>
                <div class="flex items-center justify-center h-32">
                    <i class="loader --6" />
                </div>
            </template>
        </UTable>

        <!-- Number of rows & Pagination -->
        <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <div class="flex items-center gap-1.5">
                    <span class="text-sm leading-5">Per page:</span>

                    <USelect
                        v-model="pageCount"
                        :options="[10, 20, 50, 100]"
                        class="me-2 w-20"
                        size="xs"
                    />

                    <div>
                        <span class="text-xs leading-5">
                            Showing
                            <span>{{ pageFrom }}</span>
                            to
                            <span>{{ pageTo }}</span>
                            of
                            <span>{{ pageTotal }}</span>
                            results
                        </span>
                    </div>
                </div>

                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="pageTotal"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline',
                            },
                        },
                    }"
                />
            </div>
        </template>
    </UCard>
</template>

<script lang="ts" setup>
import { h } from "vue";

import type { Column, FilterOption, Sort } from "~/components/table/types";

const props = defineProps({
    columns: {
        required: true,
        type: Array as PropType<Column[]>,
    },
    data: {
        required: true,
        type: Array,
    },
    filters: {
        default: () => [],
        type: Array as PropType<FilterOption[]>,
    },
    loading: {
        default: false,
        type: Boolean,
    },
    totalItems: {
        required: true,
        type: Number,
    },
});

const emit = defineEmits([
    "update:selectedRows",
    "update:sort",
    "update:page",
    "update:pageCount",
    "update:search",
    "update:selectedStatus",
    "update:selectedColumns",
    "resetFilters",
    "select",
]);

const getDynamicContent = (column: Column, row: never) => {
    if (!column.render) return null;

    const result = column.render(row);
    if (typeof result === "object" && result !== null) {
        return result;
    }

    return h("span", {}, String(result));
};

const selectedColumns = defineModel<Column[]>("selectedColumns");
const columnsTable = computed(() =>
    props.columns.filter((column) => selectedColumns.value?.includes(column)),
);
const excludeSelectColumn = computed(() =>
    props.columns.filter((v) => v.key !== "select"),
);
// eslint-disable-next-line vue/require-prop-types
const selectedRows = defineModel("selectedRows");
const select = (row: never) => emit("select", row);

// Pagination
const sort = defineModel<Sort>("sort");
const page = defineModel<number>("page");
const pageCount = defineModel<number>("pageCount");
const pageTotal = computed(() => props.totalItems);
const pageFrom = computed(() => {
    if (!page.value || !pageCount.value) return 1;
    return (page.value - 1) * pageCount.value + 1;
});
const pageTo = computed(() => {
    if (!page.value || !pageCount.value) return pageCount.value;
    return Math.min(page.value * pageCount.value, pageTotal.value);
});

// Filters
const search = defineModel<string>("search");
// eslint-disable-next-line vue/require-prop-types
const selectedStatus = defineModel("selectedStatus");
const resetFilters = () => emit("resetFilters");
</script>

<style scoped>
/* https://codepen.io/jenning/pen/YzNmzaV */

.loader {
    --color: rgb(var(--color-primary-400));
    --size-mid: 6vmin;
    --size-dot: 1.5vmin;
    --size-bar: 0.4vmin;
    --size-square: 3vmin;

    display: block;
    position: relative;
    width: 50%;
    display: grid;
    place-items: center;
}

.loader::before,
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
}

/**
loader --6
**/
.loader.--6::before {
    width: var(--size-square);
    height: var(--size-square);
    background-color: var(--color);
    top: calc(50% - var(--size-square));
    left: calc(50% - var(--size-square));
    animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
    0%,
    100% {
        transform: none;
    }

    25% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(100%) translateY(100%);
    }

    75% {
        transform: translateY(100%);
    }
}
</style>

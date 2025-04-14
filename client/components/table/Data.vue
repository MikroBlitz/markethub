<template>
    <UCard
        class="w-full"
        :ui="{
            base: '',
            ring: '',
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: 'p-4' },
            body: {
                padding: '',
                base: 'divide-y divide-gray-200 dark:divide-gray-700',
            },
            footer: { padding: 'p-2' },
        }"
    >
        <template #header>
            <slot name="header">
                <h2
                    class="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight"
                >
                    <slot name="title">Data Table</slot>
                </h2>
            </slot>
        </template>

        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-4 py-3 gap-3"
        >
            <!-- Filters -->
            <div class="flex items-center gap-1.5 w-full sm:w-auto">
                <UButton
                    size="2xs"
                    class="rounded-full p-1 mr-2"
                    color="red"
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
            </div>

            <div class="flex flex-wrap gap-2 items-center w-full sm:w-auto">
                <UInput
                    v-model="search"
                    icon="i-heroicons-magnifying-glass-20-solid"
                    placeholder="Search"
                    class="w-full sm:w-auto"
                />

                <div class="flex gap-2">
                    <USelectMenu
                        v-model="selectedStatus"
                        :options="filters"
                        multiple
                        placeholder="Filters"
                        icon="mdi:filter-outline"
                        class="w-32"
                    />

                    <UButton
                        v-show="selectedStatus.length > 0 || search !== ''"
                        icon="mdi:filter-remove-outline"
                        color="red"
                        variant="outline"
                        size="sm"
                        :disabled="search === '' && selectedStatus.length === 0"
                        @click="resetFilters"
                    >
                        Clear
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Desktop Table View (hidden on mobile) -->
        <div class="hidden md:block">
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
        </div>

        <!-- Mobile Card View -->
        <div class="block md:hidden">
            <div v-if="loading" class="flex items-center justify-center h-32">
                <i class="loader --6" />
            </div>
            <template v-else>
                <UCard v-for="(row, rowIndex) in data" :key="rowIndex">
                    <!-- Card Header with potential selection checkbox -->
                    <div
                        class="flex justify-between items-center p-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700"
                    >
                        <!-- Primary identifier or first column value -->
                        <div
                            class="font-medium text-gray-900 dark:text-gray-100 flex items-center"
                        >
                            <div class="w-1 h-8 bg-blue-500 rounded-r mr-2.5" />
                            {{ getPrimaryIdentifier(row) }}
                        </div>

                        <!-- Selection checkbox if selectable -->
                        <div v-if="hasSelectableRows" class="ml-2">
                            <UCheckbox
                                :model-value="isRowSelected(row)"
                                color="gray"
                                @change="toggleRowSelection(row)"
                            />
                        </div>
                    </div>

                    <!-- Card Body with column data -->
                    <div class="px-3 py-2 space-y-1.5">
                        <div
                            v-for="column in visibleColumnsForMobile"
                            :key="column.key"
                            class="flex justify-between items-center py-1.5 border-b border-dashed border-gray-100 dark:border-gray-700 last:border-none"
                        >
                            <span
                                class="text-xs font-medium text-gray-500 dark:text-gray-400"
                            >
                                {{ column.label }}
                            </span>
                            <div
                                class="text-sm font-medium text-gray-900 dark:text-gray-100 ml-2 truncate max-w-[60%] text-right"
                            >
                                <template v-if="column.render">
                                    <component
                                        :is="getDynamicContent(column, row)"
                                    />
                                </template>
                                <template v-else>
                                    {{ row[column.key] }}
                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- Card Footer with actions -->
                    <div
                        class="bg-gray-50 dark:bg-gray-700 p-2 flex justify-center"
                    >
                        <!-- Dynamic Actions -->
                        <slot name="actions-data" :row="row">
                            <div class="flex items-center gap-1">
                                <div
                                    v-for="(action, index) in actions"
                                    :key="index"
                                >
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
                        </slot>
                    </div>
                </UCard>

                <!-- Empty state -->
                <div v-if="data.length === 0" class="p-8 text-center">
                    <div class="p-6 rounded-lg inline-block mb-2">
                        <Icon
                            name="i-heroicons-inbox"
                            class="mx-auto h-10 w-10 text-gray-400"
                        />
                    </div>
                    <h3
                        class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        No results found
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter to find what you're
                        looking for.
                    </p>
                </div>
            </template>
        </div>

        <!-- Number of rows & Pagination -->
        <template #footer>
            <div
                class="flex flex-col sm:flex-row justify-between items-center gap-4"
            >
                <div class="flex items-center gap-1.5">
                    <USelect
                        v-model="pageCount"
                        :options="[10, 20, 50, 100]"
                        class="me-2 w-20"
                        size="xs"
                    />

                    <div>
                        <span
                            class="text-xs leading-5 text-gray-500 dark:text-gray-400"
                        >
                            Showing
                            <span>{{ pageFrom }}</span>
                            to
                            <span>{{ pageTo }}</span>
                            of
                            <span>{{ pageTotal }}</span>
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
    actions: {
        default: () => [],
        type: Array,
    },
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
    primaryIdentifierKey: {
        default: "",
        type: String,
    },
    showDeleteAction: {
        default: true,
        type: Boolean,
    },
    showEditAction: {
        default: true,
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
    "edit",
    "delete",
]);

const getDynamicContent = (column: Column, row: never) => {
    if (!column.render) return null;

    const result = column.render(row);
    if (typeof result === "object" && result !== null) {
        return result;
    }

    return h("span", {}, String(result));
};

// Get a primary identifier for the card header
const getPrimaryIdentifier = (row: any) => {
    // Use specified primary key if provided
    if (
        props.primaryIdentifierKey &&
        row[props.primaryIdentifierKey] !== undefined
    ) {
        return row[props.primaryIdentifierKey];
    }

    // Otherwise use first non-select column
    const firstColumn = visibleColumnsForMobile.value[0];
    if (firstColumn && row[firstColumn.key] !== undefined) {
        if (firstColumn.render) {
            // If there's a renderer, try to get text content
            const result = firstColumn.render(row);
            if (typeof result === "string") return result;
            // For complex rendered content, fall back to the raw value
            return row[firstColumn.key] || "Item";
        }
        return row[firstColumn.key];
    }

    // Fallback
    return "Item";
};

const selectedColumns = defineModel<Column[]>("selectedColumns");
const columnsTable = computed(() =>
    props.columns.filter((column) => selectedColumns.value?.includes(column)),
);
const excludeSelectColumn = computed(() =>
    props.columns.filter((v) => v.key !== "select"),
);

// For mobile view - limit to most important columns to avoid cluttered cards
const visibleColumnsForMobile = computed(() => {
    const columns =
        selectedColumns.value?.filter(
            (column) => column.key !== "select" && column.key !== "actions",
        ) || [];

    // Limit to most important columns (assuming first few are most important)
    // We can make this configurable with a prop if needed
    return columns.slice(0, 5);
});

const hasSelectableRows = computed(() =>
    props.columns.some((column) => column.key === "select"),
);

// Selection handling
const selectedRows = defineModel("selectedRows");
const select = (row: never) => emit("select", row);

const isRowSelected = (row: any) => {
    return selectedRows.value?.includes(row);
};

const toggleRowSelection = (row: any) => {
    if (!selectedRows.value) return;

    const index = selectedRows.value.indexOf(row);
    if (index === -1) {
        selectedRows.value = [...selectedRows.value, row];
    } else {
        selectedRows.value = selectedRows.value.filter((r) => r !== row);
    }
};

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

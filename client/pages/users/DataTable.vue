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

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <UInput
                v-model="search"
                icon="i-heroicons-magnifying-glass-20-solid"
                placeholder="Search..."
            />

            <USelectMenu
                v-model="selectedStatus"
                :options="filters"
                multiple
                placeholder="Status"
                class="w-40"
            />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>

                <USelect
                    v-model="pageCount"
                    :options="[10, 25, 50, 100]"
                    class="me-2 w-20"
                    size="xs"
                />
            </div>

            <div class="flex gap-1.5 items-center">
                <UDropdown
                    v-if="selectedRows.length > 1"
                    :items="actions"
                    :ui="{ width: 'w-36' }"
                >
                    <UButton
                        icon="i-heroicons-chevron-down"
                        trailing
                        color="gray"
                        size="xs"
                    >
                        Mark as
                    </UButton>
                </UDropdown>

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
            @select="select"
        >
            <template v-for="(_, slot) in $slots" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
            </template>
        </UTable>

        <!-- Number of rows & Pagination -->
        <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <div>
                    <span class="text-sm leading-5">
                        Showing
                        <span class="font-medium">{{ pageFrom }}</span>
                        to
                        <span class="font-medium">{{ pageTo }}</span>
                        of
                        <span class="font-medium">{{ pageTotal }}</span>
                        results
                    </span>
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
// Define proper interfaces for TypeScript
interface Column {
    key: string;
    label?: string;
    class?: string;
    sortable?: boolean;
}

interface FilterOption {
    key: number;
    label: string;
    value: boolean;
}

interface Action {
    key: string;
    icon: string;
    label: string;
}

interface Sort {
    column: string;
    direction: "asc" | "desc";
}

const props = defineProps({
    actions: {
        default: () => [],
        type: Array as PropType<Action[][]>,
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
    totalItems: {
        required: true,
        type: Number,
    },
});

// Emits for parent component to handle
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

// Selected Columns - Fix defineModel usage with proper types
const selectedColumns = defineModel<Column[]>("selectedColumns");
const columnsTable = computed(() =>
    props.columns.filter((column) => selectedColumns.value.includes(column)),
);
const excludeSelectColumn = computed(() =>
    props.columns.filter((v) => v.key !== "select"),
);

// Selected Rows
const selectedRows = defineModel("selectedRows");

function select(row) {
    emit("select", row);
}

// Pagination
const sort = defineModel<Sort>("sort");
const page = defineModel<number>("page");
const pageCount = defineModel<number>("pageCount");
const pageTotal = computed(() => props.totalItems);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
    Math.min(page.value * pageCount.value, pageTotal.value),
);

// Filters
const search = defineModel<string>("search");
const selectedStatus = defineModel("selectedStatus");

const resetFilters = () => {
    emit("resetFilters");
};
</script>

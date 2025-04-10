import type { Column } from "~/components/table/types";

export const columns: Column[] = [
    {
        class: "w-2",
        key: "select",
    },
    {
        key: "id",
        label: "#",
        sortable: true,
    },
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "guard_name",
        label: "Guard Name",
        sortable: true,
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
    },
    {
        key: "updated_at",
        label: "Updated At",
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

// Filters
export const status = [];

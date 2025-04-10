import { UBadge } from "#components";

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
    // {
    //     key: "role",
    //     label: "Role",
    //     sortable: true,
    // },
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "email",
        label: "Email",
        sortable: true,
    },
    {
        key: "is_active",
        label: "Status",
        render: (row) =>
            h(UBadge, {
                color: row.is_active ? "blue" : "orange",
                label: row.is_active ? "Active" : "Inactive",
                size: "sm",
                variant: "solid",
            }),
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
export const status = [
    {
        key: "is_active",
        label: "Inactive",
        value: "false", // boolean values is handles by the backend
    },
    {
        key: "is_active",
        label: "Active",
        value: "true", // boolean values is handles by the backend
    },
];

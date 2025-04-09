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
        key: "role",
        label: "Role",
        sortable: true,
    },
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
            h(
                "div",
                {
                    class:
                        row.is_active == true
                            ? "text-emerald-500 font-bold"
                            : "text-red-500 font-bold",
                },
                row.is_active === true ? "Active" : "Inactive",
            ),
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
        key: 0,
        label: "Inactive",
        value: false,
    },
    {
        key: 1,
        label: "Active",
        value: true,
    },
];

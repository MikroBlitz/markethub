import { UBadge } from "#components";
import { User } from "lucide-vue-next";

import type { Column } from "~/components/table/types";

import { colorMap, roleIconMap } from "~/utils/helpers";
import type { PermissionFragment } from "~/types/codegen/graphql";

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
        key: "permissions",
        label: "Permissions",
        render: (row) => {
            const Icon = roleIconMap[row.name] || User;

            return h(
                UBadge,
                {
                    color: colorMap[row.name] || "gray",
                    label: row.name,
                    size: "sm",
                    variant: "solid",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h(Icon, { class: "w-3 h-3" }),
                            h("span", null, row.name),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "roles",
        label: "Roles",
        render: (row: PermissionFragment) => {
            return h(
                "div",
                { class: "flex flex-wrap gap-2" },
                row.roles?.map((role) =>
                    h(
                        UBadge,
                        {
                            color: "gray",
                            label: role?.name,
                            size: "sm",
                            variant: "solid",
                        },
                        {
                            default: () =>
                                h("div", { class: "flex items-center space-x-1" }, [
                                    h("span", null, role?.name),
                                ]),
                        }
                    )
                )
            );
        },
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

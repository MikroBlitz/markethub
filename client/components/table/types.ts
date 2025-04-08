export interface Column {
    key: string;
    label?: string;
    class?: string;
    sortable?: boolean;
    render?: (row: any) => any;
}

export interface FilterOption {
    key: number;
    label: string;
    value: boolean;
}

export interface Sort {
    column: string;
    direction: "asc" | "desc";
}

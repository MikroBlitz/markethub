export interface Column {
    key: string;
    label?: string;
    class?: string;
    sortable?: boolean;
    render?: (row: any) => any;
}

export interface FilterOption {
    label: string;
    key: string | number;
    value: boolean | string;
}

export interface Sort {
    column: string;
    direction: "asc" | "desc";
}

export type Row = Record<string, any>;

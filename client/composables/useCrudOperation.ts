export function useCrudOperations<T extends Record<string, any>>(
    queries: {
        paginate: any;
        upsert: any;
        delete: any;
        updateStatus?: any;
    },
    options?: {
        getFormState?: (item?: T) => any;
        prepareSubmitData?: (data: any, selectedItem?: T) => any;
        hasRelations?: boolean;
        relationKey?: string;
    },
) {
    const defaultGetFormState = (item?: T) => {
        if (item) {
            const state: any = {};
            Object.keys(item).forEach((key) => {
                if (key === "id" || key === "name" || key === "is_active") {
                    state[key] =
                        item[key] || (key === "is_active" ? false : "");
                }
            });
            if (item.key === "password") state.password = "";
            return state;
        } else {
            return {
                description: "",
                id: "",
                is_active: false,
                name: "",
            };
        }
    };

    const defaultPrepareSubmitData = (data, selectedItem?: T) => {
        return {
            ...data,
            id: selectedItem?.id || undefined,
        };
    };

    return {
        delete: queries.delete,
        getFormState: options?.getFormState || defaultGetFormState,
        prepareSubmitData:
            options?.prepareSubmitData || defaultPrepareSubmitData,
        query: queries.paginate,
        updateStatus: queries.updateStatus,
        upsert: queries.upsert,
    };
}

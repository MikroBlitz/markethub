import type { Ref } from "vue";

import { useToast } from "#ui/composables/useToast";

type Action = {
    auth?: string | undefined;
    fetch: () => Promise<any>;
    modal?: Ref<boolean>;
    mutation: (args: { id: string }) => Promise<any>;
};

export async function useGraphQLMutation(
    text: string,
    actionText: string,
    loading: Ref<boolean>,
    input: any,
    action: Action,
) {
    const toast = useToast();
    try {
        loading.value = true;

        if (action.auth !== input) {
            await action.mutation?.(input);
            toast.add({
                color: "green",
                icon: "i-mdi-check-circle-outline",
                title: `${text} has been ${actionText}.`,
            });
        } else {
            toast.add({
                color: "red",
                icon: "i-mdi-alert-circle-outline",
                title: "Something went wrong please try again.",
            });
        }

        await action.fetch?.();
    } catch (e) {
        const err = parseGraphQLError(e);
        console.error("Remove error:", e);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error: ${err}`,
        });
    } finally {
        loading.value = false;
        if (action.modal) action.modal.value = false;
    }
}

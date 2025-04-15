import { Briefcase, Shield, User } from "lucide-vue-next";

export const authContext = () => {
    const authCookie: Ref<{ token: string }> = useCookie("auth", { path: "/" });
    if (!authCookie.value?.token) throw new Error("Missing auth token");

    return {
        context: {
            headers: {
                Authorization: `Bearer ${authCookie.value?.token}`,
            },
        },
    };
};

export const roleIconMap: Record<string, any> = {
    Admin: Shield,
    Manager: Briefcase,
    User: User,
};

export const colorMap: Record<string, string> = {
    Admin: "emerald",
    Manager: "blue",
    User: "white",
};

export function parseGraphQLError(e: any): string {
    const graphQLErrors = e?.graphQLErrors || e?.response?.errors;
    if (Array.isArray(graphQLErrors)) {
        const messages = graphQLErrors.map((error) => {
            const debugMessage = error?.extensions?.debugMessage;
            const message = error?.message;
            return debugMessage || message || "Unknown error";
        });
        messages.forEach((msg) => console.error("GraphQL Error:", msg));

        return messages.join("\n");
    }
    console.error("Unexpected error:", e);

    return "An unexpected error occurred";
}

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

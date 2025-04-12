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

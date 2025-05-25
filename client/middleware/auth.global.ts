export default defineNuxtRouteMiddleware((to, _from) => {
    const config = useRuntimeConfig();

    // TODO: Remove condition if API is hosted
    if (config.public.isLocalhost) {
        const auth = useAuthStore();
        const noAuthRoutes = ["/", "/register"];
        const router = useRouter();
        const validRoutes = router
            .getRoutes()
            .map((route) => route.path.toLowerCase());

        const toPath = to.path.toLowerCase();

        if (!validRoutes.includes(toPath)) return navigateTo("/dashboard");

        if (
            !auth.isAuthenticated &&
            !noAuthRoutes.includes(toPath) &&
            toPath !== "/login"
        )
            return navigateTo("/login");

        if (auth.isAuthenticated && toPath === "/login")
            return navigateTo("/dashboard");

        const requiredPermission = to.meta?.permission;
        if (requiredPermission && !auth.can(String(requiredPermission))) {
            return navigateTo("/unauthorized");
        }
    }
});

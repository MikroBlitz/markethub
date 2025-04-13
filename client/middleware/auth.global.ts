export default defineNuxtRouteMiddleware((to, _from) => {
    // const authStore = useAuthStore();
    // const noAuthRoutes = ["/", "/register"];
    // const router = useRouter();
    // const validRoutes = router
    //     .getRoutes()
    //     .map((route) => route.path.toLowerCase());
    //
    // const toPath = to.path.toLowerCase();
    //
    // if (!validRoutes.includes(toPath)) return navigateTo("/dashboard");
    //
    // if (
    //     !authStore.isAuthenticated &&
    //     !noAuthRoutes.includes(toPath) &&
    //     toPath !== "/login"
    // )
    //     return navigateTo("/login");
    //
    // if (authStore.isAuthenticated && toPath === "/login")
    //     return navigateTo("/dashboard");
});

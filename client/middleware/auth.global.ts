export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const noAuthRoutes = ["/"];

    if (
        !authStore.isAuthenticated &&
        !noAuthRoutes.includes(to.path) &&
        to.path !== "/login"
    ) {
        return navigateTo("/login");
    }
});

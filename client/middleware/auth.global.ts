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

     // If authenticated and trying to access login page, redirect to dashboard
    if (authStore.isAuthenticated && to.path === '/login') {
        return navigateTo('/dashboard')
    }
});

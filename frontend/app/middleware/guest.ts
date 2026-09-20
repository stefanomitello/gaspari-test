export default defineNuxtRouteMiddleware(async () => {
  const { checkAuth } = useAuth();
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    return navigateTo("/admin");
  }
});

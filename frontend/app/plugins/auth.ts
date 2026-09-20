export default defineNuxtPlugin(async () => {
  const { token, user, fetchUser, clearSession } = useAuth();

  if (import.meta.server && token.value && !user.value) {
    try {
      await fetchUser();
    } catch {
      clearSession();
    }
  }
});

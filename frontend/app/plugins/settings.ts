export default defineNuxtPlugin(async () => {
  const { settings, fetchSettings } = useSettings();

  if (!settings.value) {
    try {
      await fetchSettings();
    } catch (err) {
      console.warn("Not preload settings on Nuxt init:", err);
    }
  }
});

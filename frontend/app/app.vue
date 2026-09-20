<script setup lang="ts">
import { base, footer, contacts, socials } from '@/data/config'
const route = useRoute()

const { settings } = useSettings()

const navigationItems = computed(() => [
  { label: "Eventi", href: "/eventi", active: route.path.startsWith("/eventi") },
  { label: "Scopri Bugliano", href: "#scopri-bugliano" },
  { label: "Informazioni", href: "#informazioni" },
])

const dynamicBase = computed(() => ({
  ...base,
  name: settings.value?.app_name || base.name,
  subtitle: settings.value?.description || base.subtitle,
}))

const dynamicSocials = computed(() => {
  if (!settings.value?.social) return socials
  return socials.map((item) => {
    const label = item.label.toLowerCase()
    if (label === "facebook" && settings.value?.social.facebook) {
      return { ...item, href: settings.value.social.facebook }
    }
    if (label === "instagram" && settings.value?.social.instagram) {
      return { ...item, href: settings.value.social.instagram }
    }
    if ((label === "x" || label === "twitter") && settings.value?.social.twitter) {
      return { ...item, href: settings.value.social.twitter }
    }
    return item
  })
})

const dynamicContacts = computed(() => {
  if (!settings.value?.contact_email) return contacts
  return contacts.map((c) => {
    if (c.type === "EMAIL" && settings.value?.contact_email) {
      return { ...c, value: settings.value.contact_email }
    }
    return c
  })
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout
    :header="{ ...dynamicBase, socials: dynamicSocials }"
    :navbar="{ items: navigationItems }"
    :footer="{ ...dynamicBase, contacts: dynamicContacts, ...footer, socials: dynamicSocials }"
  >
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Trash2,
  User as UserIcon,
  AlertTriangle,
  BookmarkCheck,
} from "lucide-vue-next"
import type { EventItem } from "~/types/events"

definePageMeta({
  layout: "admin",
  middleware: "auth",
})

useSeoMeta({
  title: "Area riservata | Vivi Bugliano",
  description: "Area riservata del portale Vivi Bugliano.",
  ogTitle: "Area riservata | Vivi Bugliano",
});

const { user, logout, isAuthenticated } = useAuth()
const { getFavorites, removeFavorite: apiRemoveFavorite } = useEvents()


const savedEvents = ref<EventItem[]>([])
const searchQuery = ref("")
const isLoadingEvents = ref(false)

const isConfirmOpen = ref(false)
const eventToDelete = ref<EventItem | null>(null)
const feedbackMessage = ref<string | null>(null)

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      isLoadingEvents.value = true
      const response = await getFavorites(1, 20)
      console.log(response);

      if (response && response.data && response.data.length > 0) {
        savedEvents.value = response.data.map((ev) => ({
          id: ev.id,
          title: ev.title,
          slug: ev.slug,
          category: ev.category || "Generale",
          description: ev.description || "",
          location: ev.location || "Bugliano",
          is_favorite: ev.is_favorite,
          is_published: ev.is_published,
          created_at: ev.created_at,
          starts_at: ev.starts_at,
          ends_at: ev.ends_at,
          updated_at: ev.updated_at,
        }))
      }
    } catch {
    } finally {
      isLoadingEvents.value = false
    }
  }
})

const filteredEvents = computed(() => {
  if (!searchQuery.value.trim()) return savedEvents.value
  const q = searchQuery.value.toLowerCase().trim()
  return savedEvents.value.filter(
    (ev) =>
      ev.title.toLowerCase().includes(q)
  )
})

function formatDate(dateString?: string): string {
  if (!dateString) return "Data non specificata"
  try {
    const d = new Date(dateString)
    return new Intl.DateTimeFormat("it-IT", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d)
  } catch {
    return dateString
  }
}

function formatMemberDate(dateString?: string): string {
  if (!dateString) return "Maggio 2025"
  try {
    const d = new Date(dateString)
    return new Intl.DateTimeFormat("it-IT", {
      month: "long",
      year: "numeric",
    }).format(d)
  } catch {
    return dateString
  }
}

function openDeleteDialog(event: EventItem) {
  eventToDelete.value = event
  isConfirmOpen.value = true
}

async function confirmDelete() {
  if (!eventToDelete.value) return

  const target = eventToDelete.value
  isConfirmOpen.value = false

  try {
    if (isAuthenticated.value) {
      await apiRemoveFavorite(target.id)
    }
  } catch {
    // Gestione silenziosa con aggiornamento locale ottimistico
  }

  // Rimuovi dalla lista locale
  savedEvents.value = savedEvents.value.filter((ev) => ev.id !== target.id)

  feedbackMessage.value = `Evento «${target.title}» rimosso dai preferiti.`
  setTimeout(() => {
    feedbackMessage.value = null
  }, 4500)

  eventToDelete.value = null
}

function getCategoryBadgeVariant(category: string): "default" | "secondary" | "info" | "warning" | "success" | "outline" {
  const cat = category.toLowerCase()
  if (cat.includes("gastronom") || cat.includes("cibo")) return "warning"
  if (cat.includes("musica") || cat.includes("concerto")) return "info"
  if (cat.includes("tradizion") || cat.includes("storia")) return "success"
  if (cat.includes("cultura") || cat.includes("arte")) return "secondary"
  return "outline"
}

async function handleLogout() {
  await logout()
}

</script>

<template>
  <div class="tw:min-h-screen tw:bg-slate-50/60 tw:text-foreground tw:flex tw:flex-col">


    <main class="tw:flex-1">
      <div class="tw:mx-auto tw:max-w-7xl tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <transition enter-active-class="tw:transition tw:duration-300 tw:ease-out"
          enter-from-class="tw:transform -tw:translate-y-2 tw:opacity-0"
          enter-to-class="tw:transform tw:translate-y-0 tw:opacity-100"
          leave-active-class="tw:transition tw:duration-200 tw:ease-in"
          leave-from-class="tw:transform tw:translate-y-0 tw:opacity-100"
          leave-to-class="tw:transform -tw:translate-y-2 tw:opacity-0">
          <div v-if="feedbackMessage"
            class="tw:mb-6 tw:flex tw:items-center tw:gap-3 tw:rounded-lg tw:border tw:border-emerald-200 tw:bg-emerald-50/90 tw:p-4 tw:text-sm tw:text-emerald-800 tw:shadow-xs">
            <CheckCircle2 class="tw:size-5 tw:shrink-0 tw:text-emerald-600" />
            <span class="tw:font-medium">{{ feedbackMessage }}</span>
          </div>
        </transition>

        <div class="tw:mb-8 tw:flex tw:flex-col tw:gap-1 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
          <div>
            <h1 class="tw:text-2xl tw:font-bold tw:tracking-tight tw:text-slate-900 tw:sm:text-3xl">
              Profilo
            </h1>
          </div>

        </div>

        <div class="tw:grid tw:grid-cols-1 tw:gap-8 tw:lg:grid-cols-3">
          <div class="tw:lg:col-span-1">
            <UiCard class="tw:h-full tw:border-border/80 tw:shadow-xs tw:gap-5">
              <UiCardHeader class="tw:pb-2">
                <div class="tw:flex tw:items-start tw:gap-4">
                  <UiAvatar size="lg" class="tw:border-2 tw:border-primary/20 tw:shadow-xs">
                    <UiAvatarFallback class="tw:bg-primary tw:text-primary-foreground tw:font-bold">
                      {{ userInitials(user?.name || '') }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <div class="tw:flex-1 tw:overflow-hidden">
                    <div class="tw:flex tw:items-center tw:gap-2">
                      <UiCardTitle class="tw:text-lg tw:truncate">
                        {{ user?.name }}
                      </UiCardTitle>
                    </div>
                    <UiCardDescription class="tw:truncate tw:text-xs tw:mt-0.5 tw:mb-0!">
                      {{ user?.email }}
                    </UiCardDescription>

                  </div>
                </div>
              </UiCardHeader>

              <UiCardContent class="tw:space-y-4 tw:pt-2">
                <div class="tw:h-px tw:bg-border/60" />

                <dl class="tw:space-y-3 tw:text-xs">
                  <div class="tw:flex tw:items-center tw:justify-between tw:py-1">
                    <dt class="tw:flex tw:items-center tw:gap-2 tw:text-muted-foreground">
                      <UserIcon class="tw:size-3.5" />
                      <span>ID Utente:</span>
                    </dt>
                    <dd class="tw:font-mono tw:font-semibold tw:text-slate-800">
                      #{{ user?.id ?? 1 }}
                    </dd>
                  </div>

                  <div class="tw:flex tw:items-center tw:justify-between tw:py-1">
                    <dt class="tw:flex tw:items-center tw:gap-2 tw:text-muted-foreground">
                      <Mail class="tw:size-3.5" />
                      <span>Email:</span>
                    </dt>
                    <dd class="tw:font-medium tw:text-slate-800 tw:truncate tw:max-w-45" :title="user?.email">
                      {{ user?.email }}
                    </dd>
                  </div>

                  <div class="tw:flex tw:items-center tw:justify-between tw:py-1">
                    <dt class="tw:flex tw:items-center tw:gap-2 tw:text-muted-foreground">
                      <Calendar class="tw:size-3.5" />
                      <span>Registrato il:</span>
                    </dt>
                    <dd class="tw:font-medium tw:text-slate-800">
                      {{ formatMemberDate(user?.created_at) }}
                    </dd>
                  </div>
                </dl>
              </UiCardContent>

              <UiCardFooter class="tw:pt-2 tw:flex tw:flex-col tw:gap-2 tw:mt-auto">
                <UiButton variant="destructive" class="tw:w-full tw:justify-center tw:gap-2" @click="handleLogout">
                  <LogOut class="tw:size-4" />
                  Esci
                </UiButton>
              </UiCardFooter>
            </UiCard>
          </div>

          <div class="tw:lg:col-span-2">
            <UiCard class="tw:h-full tw:border-border/80 tw:shadow-xs tw:gap-5">
              <UiCardHeader class="tw:pb-3">
                <div class="tw:flex tw:flex-col tw:gap-3 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
                  <div>
                    <div class="tw:flex tw:items-center tw:gap-2.5">
                      <UiCardTitle class="tw:text-xl tw:text-slate-900">
                        Eventi Preferiti
                      </UiCardTitle>
                      <UiBadge variant="secondary" class="tw:font-semibold">
                        {{ filteredEvents.length }} {{ filteredEvents.length === 1 ? 'evento' : 'eventi' }}
                      </UiBadge>
                    </div>
                    <UiCardDescription class="tw:mt-1 tw:text-xs">
                      Lista degli eventi preferiti.
                    </UiCardDescription>
                  </div>

                  <div class="tw:relative! tw:w-full tw:sm:w-64">
                    <Search
                      class="tw:absolute tw:right-2.5 tw:top-1/2 tw:size-3.5 tw:-translate-y-1/2 tw:text-muted-foreground" />
                    <input v-model="searchQuery" type="text" placeholder="Cerca evento o categoria..."
                      class="tw:h-8 tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-background tw:pl-8 tw:pr-3 tw:text-xs tw:shadow-xs tw:outline-none focus:tw:ring-2 focus:tw:ring-ring">
                  </div>
                </div>
              </UiCardHeader>

              <UiCardContent class="tw:space-y-3">
                <div v-if="isLoadingEvents" class="tw:py-12 tw:text-center tw:text-muted-foreground tw:text-sm">
                  <div
                    class="tw:inline-block tw:size-6 tw:animate-spin tw:rounded-full tw:border-2 tw:border-primary tw:border-t-transparent tw:mb-2" />
                  <p>Caricamento eventi salvati in corso...</p>
                </div>

                <div v-else-if="filteredEvents.length === 0"
                  class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-dashed tw:border-border tw:bg-slate-50/50 tw:py-12 tw:px-6 tw:text-center">
                  <div
                    class="tw:flex tw:size-12 tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-muted-foreground tw:mb-3">
                    <BookmarkCheck class="tw:size-6" />
                  </div>
                  <h3 class="tw:text-sm tw:font-semibold tw:text-slate-900">
                    {{ searchQuery ? 'Nessun evento corrisponde alla ricerca' : 'Nessun evento nei preferiti' }}
                  </h3>
                  <p class="tw:mt-1 tw:text-xs tw:text-muted-foreground tw:max-w-sm">
                    {{ searchQuery ?
                      'Prova a modificare la ricerca per trovare gli eventi desiderati.' :
                      '' }}
                  </p>
                  <NuxtLink to="/eventi" data-focus-mouse="false"
                    class="tw:mt-4 tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-primary! tw:px-3.5 tw:py-2 tw:text-xs tw:font-medium tw:text-primary-foreground! tw:shadow-xs hover:tw:bg-primary/90! tw:transition-colors">
                    Esplora gli eventi
                  </NuxtLink>
                </div>

                <div v-else class="tw:space-y-3">
                  <div v-for="event in filteredEvents" :key="event.id"
                    class="tw:group tw:relative tw:flex tw:flex-col tw:justify-between tw:gap-3 tw:rounded-lg tw:border tw:border-border/70 tw:bg-card tw:p-4 tw:shadow-xs tw:transition-all hover:tw:border-primary/40 hover:tw:shadow-sm sm:tw:flex-row sm:tw:items-center">
                    <div class="tw:flex-1 tw:space-y-1.5">
                      <div class="tw:flex tw:items-center tw:gap-2 tw:flex-wrap">
                        <UiBadge :variant="getCategoryBadgeVariant(event.category)">
                          {{ event.category }}
                        </UiBadge>
                        <span class="tw:flex tw:items-center tw:gap-1 tw:text-[11px] tw:text-muted-foreground">
                          <Clock class="tw:size-3" />
                          {{ formatDate(event.starts_at) }}
                        </span>
                      </div>

                      <h4
                        class="tw:text-sm tw:font-bold tw:text-slate-900 group-hover:tw:text-primary tw:transition-colors">
                        <NuxtLink :to="'/eventi' + event.slug">{{ event.title }}</NuxtLink>
                      </h4>

                      <p class="tw:text-xs tw:text-muted-foreground tw:line-clamp-2 tw:max-w-2xl">
                        {{ event.description }}
                      </p>

                      <div class="tw:flex tw:items-center tw:gap-1 tw:text-xs tw:text-slate-600 tw:pt-0.5">
                        <MapPin class="tw:size-3.5 tw:text-muted-foreground tw:shrink-0" />
                        <span class="tw:truncate">{{ event.location }}</span>
                      </div>
                    </div>

                    <div
                      class="tw:flex tw:items-center tw:gap-2 tw:shrink-0 tw:border-t tw:border-border/50 tw:pt-3 sm:tw:border-t-0 sm:tw:pt-0">
                      <UiButton variant="ghost" size="sm"
                        class="tw:text-muted-foreground hover:tw:text-destructive hover:tw:bg-destructive/10 tw:gap-1.5 tw:w-full sm:tw:w-auto"
                        @click="openDeleteDialog(event)">
                        <Trash2 class="tw:size-3.5" />
                        <span class="tw:text-xs">Rimuovi</span>
                      </UiButton>
                    </div>
                  </div>
                </div>
              </UiCardContent>

              <UiCardFooter
                class="tw:pt-2 tw:flex tw:items-center tw:justify-between tw:border-t tw:border-border/40 tw:text-xs tw:text-muted-foreground">
                <span>Visualizzati {{ filteredEvents.length }} di {{ savedEvents.length }} eventi</span>
                <NuxtLink to="/eventi"
                  class="tw:inline-flex tw:items-center tw:gap-1 tw:font-medium tw:text-primary hover:tw:underline">
                  Aggiungi altri eventi
                </NuxtLink>
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
    </main>



    <UiDialog :open="isConfirmOpen" @update:open="(val) => (isConfirmOpen = val)">
      <UiDialogContent size="default" class="tw:sm:max-w-md">
        <UiDialogHeader>
          <div class="tw:flex tw:items-center tw:gap-3 tw:mb-1">
            <div
              class="tw:flex tw:size-10 tw:items-center tw:justify-center tw:rounded-full tw:bg-destructive/10 tw:text-destructive">
              <AlertTriangle class="tw:size-5" />
            </div>
            <div>
              <UiDialogTitle class="tw:text-base tw:font-bold tw:text-slate-900">
                Rimuovere l'evento dai preferiti?
              </UiDialogTitle>
              <UiDialogDescription class="tw:text-xs tw:mt-0.5">
                Questa operazione rimuoverà l'evento dalla tua lista personale.
              </UiDialogDescription>
            </div>
          </div>
        </UiDialogHeader>

        <div v-if="eventToDelete"
          class="tw:my-2 tw:rounded-lg tw:border tw:border-border/80 tw:bg-slate-50 tw:p-3.5 tw:text-xs tw:space-y-1.5">
          <div class="tw:font-semibold tw:text-slate-900">
            {{ eventToDelete.title }}
          </div>
          <div class="tw:flex tw:items-center tw:gap-3 tw:text-muted-foreground">
            <span class="tw:flex tw:items-center tw:gap-1">
              <Calendar class="tw:size-3" />
              {{ formatDate(eventToDelete.starts_at) }}
            </span>
            <span class="tw:flex tw:items-center tw:gap-1">
              <MapPin class="tw:size-3" />
              {{ eventToDelete.location }}
            </span>
          </div>
        </div>

        <UiDialogFooter class="tw:gap-2 tw:pt-2">
          <UiButton variant="outline" size="sm" @click="isConfirmOpen = false">
            Annulla
          </UiButton>
          <UiButton variant="destructive" size="sm" class="tw:gap-1.5" @click="confirmDelete">
            <Trash2 class="tw:size-3.5" />
            Rimuovi
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
import type { EventItem } from "~/types/events"

useSeoMeta({
  title: "Eventi | Vivi Bugliano",
  description: "Scopri gli eventi, le attività e le esperienze in programma a Bugliano.",
  ogTitle: "Eventi | Vivi Bugliano",
  ogDescription: "Scopri gli eventi, le attività e le esperienze in programma a Bugliano.",
})

const route = useRoute()
const router = useRouter()
const { getEvents, getCategories } = useEvents()

// Load categories dynamically from API in SSR
const { data: categoriesData } = await useAsyncData("events-categories", () => getCategories())
const categories = computed(() => ["Tutte", ...(categoriesData.value || [])])

// State synced with query params
const searchTerm = ref((route.query.search as string) || "")
const selectedCategory = ref((route.query.category as string) || "Tutte")
const currentPage = ref(Number(route.query.page) || 1)
const itemsPerPage = 6

// Fetch paginated events from API in SSR
const {
  data: eventsResponse,
  status,
  refresh,
} = await useAsyncData(
  "events-list",
  () =>
    getEvents({
      title: searchTerm.value.trim() || undefined,
      category: selectedCategory.value !== "Tutte" ? selectedCategory.value : undefined,
      page: currentPage.value,
      per_page: itemsPerPage,
      sort: "starts_at",
    }),
  {
    watch: [currentPage, selectedCategory],
  }
)

const events = computed<EventItem[]>(() => eventsResponse.value?.data || [])
const totalEvents = computed(() => eventsResponse.value?.meta?.total ?? 0)
const pageCount = computed(() => eventsResponse.value?.meta?.last_page ?? 1)
const isLoading = computed(() => status.value === "pending")

const resultsMessage = computed(() => {
  const total = totalEvents.value
  return total === 1 ? "1 evento trovato" : `${total} eventi trovati`
})

// Debounced search handling
let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchTerm, () => {
  currentPage.value = 1
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    refresh()
  }, 350)
})

watch(selectedCategory, () => {
  currentPage.value = 1
})

function resetFilters() {
  searchTerm.value = ""
  selectedCategory.value = "Tutte"
  currentPage.value = 1
  refresh()
}

function handlePageChange(page: number) {
  currentPage.value = page
  if (import.meta.client) {
    window.scrollTo({ top: 300, behavior: "smooth" })
  }
}
</script>

<template>
  <section class="page-intro">
    <div class="container">
      <Breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Eventi' }]" />
      <div class="row justify-content-between align-items-end gy-4">
        <div class="col-lg-8">
          <p class="text-uppercase fw-semibold small mb-2">Vivi il territorio</p>
          <h1 class="display-3 mb-3">Eventi a Bugliano</h1>
          <p class="lead mb-0">Incontri, cultura, natura e sapori: trova l'esperienza giusta per te.</p>
        </div>
        <div class="col-lg-3">
          <p class="mb-0 text-lg-end text-secondary">
            <strong>{{ totalEvents }}</strong> appuntamenti in programma
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5" aria-labelledby="results-heading">
    <EventFilters
      v-model="searchTerm"
      v-model:selected-category="selectedCategory"
      :categories="categories"
      @reset="resetFilters"
    />

    <div class="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mt-5 mb-4">
      <h2 id="results-heading" class="h3 mb-0">Eventi in programma</h2>
      <div class="d-flex align-items-center gap-3">
        <span v-if="isLoading" class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true" />
        <p class="mb-0 text-secondary" aria-live="polite" aria-atomic="true">{{ resultsMessage }}</p>
      </div>
    </div>

    <!-- Lista Eventi con caricamento dinamico -->
    <div v-if="events.length" class="row g-4" :class="{ 'opacity-50': isLoading }">
      <div v-for="event in events" :key="event.id" class="col-md-6 col-xl-4">
        <EventCard :event="event" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="alert alert-info mt-4" role="status">
      <h3 class="h5">Nessun evento trovato</h3>
      <p class="mb-0">Prova a modificare la ricerca o a scegliere un'altra categoria.</p>
    </div>

    <!-- Paginazione collegata all'API -->
    <EventPagination
      v-if="pageCount > 1"
      :current-page="currentPage"
      :page-count="pageCount"
      @change="handlePageChange"
    />
  </section>

  <section id="scopri-bugliano" class="discovery-section py-5">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-7">
          <p class="text-uppercase fw-semibold small mb-2">Oltre gli eventi</p>
          <h2 class="display-5">Un borgo da scoprire, con calma</h2>
          <p class="lead mb-0">
            Tra colline, piazze e sentieri, Bugliano offre occasioni per fermarsi e stare insieme.
          </p>
        </div>
        <div id="informazioni" class="col-lg-5">
          <div class="p-4 bg-white shadow-sm border-start border-4 border-primary">
            <h3 class="h4">Hai bisogno di informazioni?</h3>
            <p>
              Contatta l'Ufficio turismo per ricevere indicazioni su accessibilità, prenotazioni e come raggiungere gli eventi.
            </p>
            <a href="mailto:turismo@comune.bugliano.it" class="btn btn-primary">Contatta l'Ufficio turismo</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

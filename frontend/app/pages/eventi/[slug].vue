<script setup lang="ts">
import type { EventItem } from "~/types/events"

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

const { getEventBySlug, toggleFavorite } = useEvents()
const { isAuthenticated } = useAuth()
const isTogglingFavorite = ref(false)

const { data: event, error } = await useAsyncData<EventItem>(
  `event-${slug}`,
  () => getEventBySlug(slug!)
)

if (error.value || !event.value) {
  throw createError({ statusCode: 404, statusMessage: "Evento non trovato" })
}

useSeoMeta({
  title: computed(() => `${event.value?.title} | Vivi Bugliano`),
  description: computed(() => event.value?.description),
  ogTitle: computed(() => `${event.value?.title} | Vivi Bugliano`),
  ogDescription: computed(() => event.value?.description),
  ogType: "website",
})

const iconByAccent: Record<string, string> = {
  cultura: "it-pa",
  natura: "it-presentation",
  sapori: "it-star-full",
  famiglie: "it-star-outline",
}

const accent = computed<"cultura" | "natura" | "sapori" | "famiglie">(() => {
  const cat = (event.value?.category || "").toLowerCase()
  if (cat.includes("cultura") || cat.includes("teatro") || cat.includes("arte")) return "cultura"
  if (cat.includes("natura") || cat.includes("trekking") || cat.includes("ambient")) return "natura"
  if (cat.includes("enogastronomia") || cat.includes("sagra") || cat.includes("sapori") || cat.includes("cibo")) return "sapori"
  if (cat.includes("famiglie") || cat.includes("bambini") || cat.includes("laborator")) return "famiglie"
  return "cultura"
})

const dateInfo = computed(() => {
  if (!event.value?.starts_at) return { dateLabel: "", timeLabel: "" }

  try {
    const start = new Date(event.value.starts_at)
    const dateLabel = new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(start)

    const startTime = new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(start)

    let timeLabel = `Ore ${startTime}`
    if (event.value.ends_at) {
      const end = new Date(event.value.ends_at)
      const endTime = new Intl.DateTimeFormat("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(end)
      timeLabel = `${startTime} — ${endTime}`
    }

    return { dateLabel, timeLabel }
  } catch {
    return { dateLabel: event.value.starts_at, timeLabel: "" }
  }
})

async function handleToggleFavorite() {
  if (!event.value || isTogglingFavorite.value) return
  isTogglingFavorite.value = true
  try {
    await toggleFavorite(event.value)
  } catch (err) {
    console.error("Errore durante il salvataggio nei preferiti:", err)
  } finally {
    isTogglingFavorite.value = false
  }
}
</script>

<template>
  <article v-if="event">
    <div class="container pt-4">
      <Breadcrumb :items="[
        { label: 'Home', href: '/' },
        { label: 'Eventi', href: '/eventi' },
        { label: event.title }
      ]" />
    </div>

    <header :class="['event-hero', `event-hero--${accent}`]">
      <div class="container py-5 py-lg-6">
        <div class="row align-items-center g-5">
          <div class="col-lg-8">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="chip chip-simple chip-primary">
                <span class="chip-label text-capitalize">{{ event.category }}</span>
              </span>

              <Button v-if="isAuthenticated" type="button"
                class="btn btn-sm btn-outline border d-inline-flex align-items-center gap-2"
                :disabled="isTogglingFavorite" @click="handleToggleFavorite">
                <Icon :name="event.is_favorite ? 'it-star-full' : 'it-star-outline'" class="icon-sm icon-light"
                  :class="event.is_favorite ? 'text-warning' : 'text-secondary'" />
                <span class="small fw-semibold">
                  {{ event.is_favorite ? 'Nei tuoi preferiti' : 'Salva nei preferiti' }}
                </span>
              </Button>
            </div>

            <h1 class="display-3 mb-4">{{ event.title }}</h1>
            <p class="lead mb-0">{{ event.description }}</p>
          </div>
          <div class="col-lg-4" aria-hidden="true">
            <div class="event-hero__icon">
              <Icon class="icon-xxl" :name="iconByAccent[accent] || ''" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container py-5 py-lg-6">
      <div class="row g-5">
        <div class="col-lg-8">
          <section aria-labelledby="event-description">
            <h2 id="event-description" class="h3">L'evento</h2>
            <p>{{ event.description }}</p>
            <p>
              Un'occasione per incontrare il territorio e le persone che lo animano. Il programma è pensato per offrire
              un'esperienza piacevole e accessibile a tutte e tutti.
            </p>
            <p>
              Per informazioni sulle modalità di partecipazione e sulle esigenze di accessibilità, contatta l'Ufficio
              turismo prima dell'evento.
            </p>
          </section>

          <section class="mt-5" aria-labelledby="event-location-info">
            <h2 id="event-location-info" class="h3">Luogo dell'appuntamento</h2>
            <p>
              L'evento si terrà presso <strong>{{ event.location }}</strong>.
              Ti consigliamo di arrivare con qualche minuto di anticipo per facilitare le operazioni di accesso.
            </p>
          </section>
        </div>

        <aside class="col-lg-4" aria-labelledby="event-info">
          <div class="event-info-card p-4 p-lg-5">
            <h2 id="event-info" class="h3">Informazioni</h2>
            <dl class="mb-4">
              <div class="mb-3">
                <dt class="d-flex align-items-center mb-1">
                  <Icon class="icon-sm me-2" name="it-calendar" />
                  <span>Quando</span>
                </dt>
                <dd class="ms-4 mb-0">
                  <time :datetime="event.starts_at">{{ dateInfo.dateLabel }}</time>
                  <br>
                  <span class="text-secondary">{{ dateInfo.timeLabel }}</span>
                </dd>
              </div>

              <div class="mb-3">
                <dt class="d-flex align-items-center mb-1">
                  <Icon class="icon-sm me-2" name="it-map-marker-circle" />
                  <span>Dove</span>
                </dt>
                <dd class="ms-4 mb-0">
                  <strong>{{ event.location }}</strong>
                </dd>
              </div>

              <div>
                <dt class="d-flex align-items-center mb-1">
                  <Icon class="icon-sm me-2" name="it-bookmark" />
                  <span>Categoria</span>
                </dt>
                <dd class="ms-4 mb-0 text-capitalize">
                  {{ event.category }}
                </dd>
              </div>
            </dl>

            <a class="btn btn-primary w-100" href="mailto:turismo@comune.bugliano.it?subject=Informazioni%20evento">
              Richiedi informazioni
            </a>
          </div>
        </aside>
      </div>

      <div class="mt-5 pt-4 border-top">
        <NuxtLink to="/eventi" class="btn btn-outline-primary">
          <Icon class="icon-sm" name="it-arrow-left" /> Torna agli eventi
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

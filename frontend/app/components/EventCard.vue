<script setup lang="ts">
import type { EventItem } from "~/types/events"

interface EventCardProps {
  event: EventItem
  headingLevel?: 2 | 3 | 4
}

const props = withDefaults(defineProps<EventCardProps>(), { headingLevel: 2 })
const emit = defineEmits<{
  toggleFavorite: [event: EventItem]
}>()

const { isAuthenticated } = useAuth()
const { toggleFavorite } = useEvents()
const isToggling = ref(false)

const titleTag = computed(() => `h${props.headingLevel}`)

const iconByAccent: Record<string, string> = {
  cultura: "it-pa",
  natura: "it-presentation",
  sapori: "it-star-full",
  famiglie: "it-star-outline",
}

const accent = computed<"cultura" | "natura" | "sapori" | "famiglie">(() => {
  const cat = (props.event.category || "").toLowerCase()
  if (cat.includes("cultura") || cat.includes("teatro") || cat.includes("arte")) return "cultura"
  if (cat.includes("natura") || cat.includes("trekking") || cat.includes("ambient")) return "natura"
  if (cat.includes("enogastronomia") || cat.includes("sagra") || cat.includes("sapori") || cat.includes("cibo")) return "sapori"
  if (cat.includes("famiglie") || cat.includes("bambini") || cat.includes("laborator")) return "famiglie"
  return "cultura"
})

const dateInfo = computed(() => {
  if (!props.event.starts_at) return { dateLabel: "", timeLabel: "" }

  try {
    const start = new Date(props.event.starts_at)
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
    if (props.event.ends_at) {
      const end = new Date(props.event.ends_at)
      const endTime = new Intl.DateTimeFormat("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(end)
      timeLabel = `${startTime} — ${endTime}`
    }

    return { dateLabel, timeLabel }
  } catch {
    return { dateLabel: props.event.starts_at, timeLabel: "" }
  }
})

async function handleToggleFavorite() {
  if (isToggling.value) return
  isToggling.value = true
  try {
    await toggleFavorite(props.event)
    emit("toggleFavorite", props.event)
  } catch (err) {
    console.error("Errore durante il toggle dei preferiti:", err)
  } finally {
    isToggling.value = false
  }
}
</script>

<template>
  <article class="card-wrapper card-space event-card h-100">
    <div class="card card-bg h-100 position-relative">
      <div :class="['event-card__visual', `event-card__visual--${accent}`]" aria-hidden="true">
        <Icon class="icon-xl" :name="iconByAccent[accent] || ''" />
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
          <span class="chip chip-simple chip-primary text-truncate">
            <span class="chip-label text-capitalize">{{ event.category }}</span>
          </span>
          <div class="d-flex align-items-center gap-2">
            <span class="small text-secondary text-nowrap">{{ dateInfo.timeLabel }}</span>

            <!-- Pulsante preferiti visibile se autenticato -->
            <button v-if="isAuthenticated" type="button" class="btn btn-sm p-1 favorite-btn"
              :class="event.is_favorite ? 'btn-warning text-white' : 'btn-outline-secondary'"
              :aria-label="event.is_favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'"
              :title="event.is_favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'" :disabled="isToggling"
              @click.prevent.stop="handleToggleFavorite">
              <Icon :name="event.is_favorite ? 'it-star-full' : 'it-star-outline'" class="icon-xs" />
            </button>
          </div>
        </div>

        <component :is="titleTag" class="card-title h4">
          <NuxtLink :to="`/eventi/${event.slug}`" class="text-decoration-none stretched-link">
            {{ event.title }}
          </NuxtLink>
        </component>

        <p class="card-text mb-3 text-truncate-3">{{ event.description }}</p>

        <div class="event-card__meta text-secondary mt-auto">
          <p class="mb-1">
            <Icon class="icon-sm me-1" name="it-calendar" />
            <time :datetime="event.starts_at">{{ dateInfo.dateLabel }}</time>
          </p>
          <p class="mb-0">
            <Icon class="icon-sm me-1" name="it-map-marker-circle" />
            {{ event.location }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.favorite-btn {
  position: relative;
  z-index: 2;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

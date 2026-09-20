<script setup lang="ts">
export type ChipColor = "primary" | "secondary" | "success" | "danger" | "warning"

export interface ChipProps {
  label: string
  color?: ChipColor
  size?: "default" | "lg"
  removable?: boolean
  removeLabel?: string
  icon?: string
  avatarSrc?: string
  avatarAlt?: string
}

const props = withDefaults(defineProps<ChipProps>(), {
  color: "primary",
  size: "default",
  removeLabel: "Rimuovi",
  avatarAlt: "",
})

const emit = defineEmits<{ remove: [] }>()

const classes = computed(() => [
  "chip",
  `chip-${props.color}`,
  !props.removable && "chip-simple",
  props.size === "lg" && "chip-lg",
  props.removable && "alert",
])
const iconHref = computed(
  () => `/sprites.svg#${props.icon}`,
)
</script>

<template>
  <div :class="classes">
    <div v-if="avatarSrc" class="avatar size-xs">
      <img :src="avatarSrc" :alt="avatarAlt" />
    </div>
    <svg v-else-if="icon" class="icon icon-xs" aria-hidden="true">
      <use :href="iconHref" />
    </svg>
    <span class="chip-label">{{ label }}</span>
    <button v-if="removable" type="button" @click="emit('remove')">
      <svg class="icon" aria-hidden="true">
        <use href="/sprites.svg#it-close" />
      </svg>
      <span class="visually-hidden">{{ removeLabel }} {{ label }}</span>
    </button>
  </div>
</template>

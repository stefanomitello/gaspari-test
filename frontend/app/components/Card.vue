<script setup lang="ts">
export interface CardProps {
  title: string
  titleHref?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  variant?: "default" | "banner" | "inline" | "inline-mini"
  fullHeight?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  headingLevel: 3,
  variant: "default",
})

const titleTag = computed(() => `h${props.headingLevel}`)
const classes = computed(() => [
  "it-card",
  props.variant === "banner" && "it-card-banner",
  props.variant === "inline" && "it-card-inline",
  props.variant === "inline-mini" && ["it-card-inline", "it-card-inline-mini"],
  props.fullHeight && "it-card-height-full",
])
</script>

<template>
  <article :class="classes">
    <component :is="titleTag" class="it-card-title">
      <a v-if="titleHref" :href="titleHref">{{ title }}</a>
      <template v-else>{{ title }}</template>
    </component>
    <div v-if="imageSrc" class="it-card-image">
      <img :src="imageSrc" :alt="imageAlt ?? ''" />
    </div>
    <div class="it-card-body">
      <p v-if="description" class="it-card-text">{{ description }}</p>
      <slot />
    </div>
    <footer v-if="$slots.footer" class="it-card-footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

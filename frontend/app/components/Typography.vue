<script setup lang="ts">
export type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"

export interface TypographyProps {
  as?: TypographyElement
  display?: 1 | 2 | 3 | 4 | 5 | 6
  lead?: boolean
  muted?: boolean
  align?: "start" | "center" | "end"
  font?: "sans-serif" | "serif" | "monospace"
  weight?: "normal" | "medium" | "semibold" | "bold"
}

const props = withDefaults(defineProps<TypographyProps>(), {
  as: "p",
})

const classes = computed(() => [
  props.display && `display-${props.display}`,
  props.lead && "lead",
  props.muted && "text-muted",
  props.align && `text-${props.align}`,
  props.font && `font-${props.font}`,
  props.weight && `fw-${props.weight}`,
])
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

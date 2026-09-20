<script setup lang="ts">

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"

export interface ButtonProps {
  variant?: ButtonVariant
  size?: "sm" | "lg"
  href?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  block?: boolean
  icon?: string
  iconPosition?: "start" | "end"
  ariaLabel?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  type: "button",
  iconPosition: "start",
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const isLink = computed(() => Boolean(props.href))
const classes = computed(() => [
  "btn",
  `btn-${props.variant}`,
  props.size && `btn-${props.size}`,
  props.block && "w-100",
  props.icon && "btn-icon",
  props.disabled && "disabled",
])
const iconHref = computed(
  () => `sprites.svg#${props.icon}`,
)

function onLinkClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit("click", event)
}
</script>

<template>
  <NuxtLink v-if="isLink" :href="href" :class="classes" role="button" :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined" :tabindex="disabled ? -1 : undefined" @click="onLinkClick">
    <svg v-if="icon && iconPosition === 'start'" class="icon me-2" aria-hidden="true">
      <use :href="iconHref" />
    </svg>
    <slot />
    <svg v-if="icon && iconPosition === 'end'" class="icon ms-2" aria-hidden="true">
      <use :href="iconHref" />
    </svg>
  </NuxtLink>
  <button v-else :type="type" :class="classes" :disabled="disabled" :aria-label="ariaLabel"
    @click="emit('click', $event)">
    <svg v-if="icon && iconPosition === 'start'" class="icon" aria-hidden="true">
      <use :href="iconHref" />
    </svg>
    <slot />
    <svg v-if="icon && iconPosition === 'end'" class="icon" aria-hidden="true">
      <use :href="iconHref" />
    </svg>
  </button>
</template>

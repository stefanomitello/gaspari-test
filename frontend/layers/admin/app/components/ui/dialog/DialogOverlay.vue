<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogOverlay } from "reka-ui"
import { cn } from "@admin/utils"
import { dialogOverlayVariants } from "."

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    :class="cn(dialogOverlayVariants(), props.class)"
    v-bind="props"
  />
</template>

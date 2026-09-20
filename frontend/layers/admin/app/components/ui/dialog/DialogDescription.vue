<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogDescription } from "reka-ui"
import { cn } from "@admin/utils"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    :class="cn('tw:text-sm tw:text-muted-foreground', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>

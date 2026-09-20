<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogTitle } from "reka-ui"
import { cn } from "@admin/utils"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    :class="cn('tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight tw:text-foreground', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>

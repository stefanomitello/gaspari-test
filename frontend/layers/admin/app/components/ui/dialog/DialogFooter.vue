<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@admin/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('tw:flex tw:flex-col-reverse tw:sm:flex-row tw:sm:justify-end tw:sm:gap-2 tw:gap-2', props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@admin/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p data-slot="card-description" :class="cn('tw:text-muted-foreground tw:text-sm', props.class)">
    <slot />
  </p>
</template>

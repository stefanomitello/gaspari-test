<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from '@admin/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ul data-slot="breadcrumb-list"
    :class="cn('tw:text-muted-foreground tw:flex tw:flex-wrap tw:items-center tw:gap-1.5 tw:text-sm tw:wrap-break-word tw:sm:gap-2.5 tw:list-none tw:mb-0! tw:pl-0!', props.class)">
    <slot />
  </ul>
</template>

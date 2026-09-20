<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from '@admin/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li data-slot="breadcrumb-item" :class="cn('tw:inline-flex tw:items-center tw:gap-1.5 tw:list-none', props.class)">
    <slot />
  </li>
</template>

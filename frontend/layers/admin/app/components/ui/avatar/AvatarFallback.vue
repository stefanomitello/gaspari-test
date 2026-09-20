<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AvatarFallback } from "reka-ui"
import { cn } from "@admin/utils"

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    :class="cn('tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:font-medium tw:text-muted-foreground', props.class)"
    v-bind="props"
  >
    <slot />
  </AvatarFallback>
</template>

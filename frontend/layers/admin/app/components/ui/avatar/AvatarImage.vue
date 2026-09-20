<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AvatarImage } from "reka-ui"
import { cn } from "@admin/utils"

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    :class="cn('tw:aspect-square tw:size-full tw:object-cover', props.class)"
    v-bind="props"
  />
</template>

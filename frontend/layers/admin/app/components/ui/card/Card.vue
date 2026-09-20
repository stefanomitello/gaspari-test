<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { CardVariants } from "."
import { cn } from "@admin/utils"
import { cardVariants } from "."

interface Props {
  variant?: CardVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
</script>

<template>
  <div
    data-slot="card"
    :class="cn(cardVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>

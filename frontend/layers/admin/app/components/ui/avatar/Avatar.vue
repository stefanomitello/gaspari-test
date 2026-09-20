<script setup lang="ts">
import type { AvatarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { AvatarVariants } from "."
import { AvatarRoot } from "reka-ui"
import { cn } from "@admin/utils"
import { avatarVariants } from "."

interface Props extends AvatarRootProps {
  size?: AvatarVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn(avatarVariants({ size }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>

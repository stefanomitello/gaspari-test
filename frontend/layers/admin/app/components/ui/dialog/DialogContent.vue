<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { DialogContentVariants } from "."
import { X } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@admin/utils"
import { dialogContentVariants } from "."
import DialogOverlay from "./DialogOverlay.vue"

interface DialogCustomProps extends DialogContentProps {
  size?: DialogContentVariants["size"]
  class?: HTMLAttributes["class"]
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogCustomProps>(), {
  size: "default",
})

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "size")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent data-slot="dialog-content" :class="cn(dialogContentVariants({ size }), props.class)"
      v-bind="{ ...$attrs, ...forwarded }">
      <slot />

      <DialogClose
        class="tw:ring-offset-background! tw:focus:ring-ring! tw:data-[state=open]:bg-secondary! tw:absolute tw:top-4 tw:right-4 tw:rounded-full! tw:border-0 tw:opacity-70 tw:transition-opacity tw:hover:opacity-100 tw:focus:ring-2 tw:focus:ring-offset-2 tw:focus:outline-hidden tw:disabled:pointer-events-none">
        <X class="tw:size-4" />
        <span class="tw:sr-only">Chiudi</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

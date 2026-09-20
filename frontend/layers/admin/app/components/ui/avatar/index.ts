import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Avatar } from "./Avatar.vue"
export { default as AvatarFallback } from "./AvatarFallback.vue"
export { default as AvatarImage } from "./AvatarImage.vue"

export const avatarVariants = cva(
  "tw:relative tw:flex tw:shrink-0 tw:overflow-hidden tw:rounded-full",
  {
    variants: {
      size: {
        sm: "tw:size-8 tw:text-xs",
        default: "tw:size-10 tw:text-sm",
        lg: "tw:size-14 tw:text-base",
        xl: "tw:size-20 tw:text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariants>

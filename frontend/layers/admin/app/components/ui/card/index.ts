import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Card } from "./Card.vue"
export { default as CardAction } from "./CardAction.vue"
export { default as CardContent } from "./CardContent.vue"
export { default as CardDescription } from "./CardDescription.vue"
export { default as CardFooter } from "./CardFooter.vue"
export { default as CardHeader } from "./CardHeader.vue"
export { default as CardTitle } from "./CardTitle.vue"

export const cardVariants = cva(
  "tw:bg-card tw:text-card-foreground tw:flex tw:flex-col tw:gap-6 tw:rounded-xl tw:border tw:py-6 tw:shadow-sm",
  {
    variants: {
      variant: {
        default: "tw:border-border",
        muted: "tw:bg-muted/40 tw:border-border",
        ghost: "tw:border-transparent tw:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type CardVariants = VariantProps<typeof cardVariants>

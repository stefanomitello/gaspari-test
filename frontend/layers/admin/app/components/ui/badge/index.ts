import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "tw:inline-flex tw:items-center tw:rounded-full tw:border tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "tw:border-transparent tw:bg-primary tw:text-primary-foreground hover:tw:bg-primary/80",
        secondary:
          "tw:border-transparent tw:bg-secondary tw:text-secondary-foreground hover:tw:bg-secondary/80",
        destructive:
          "tw:border-transparent tw:bg-destructive tw:text-destructive-foreground hover:tw:bg-destructive/80",
        outline: "tw:text-foreground tw:border-border",
        success:
          "tw:border-emerald-200 tw:bg-emerald-50 tw:text-emerald-700",
        warning:
          "tw:border-amber-200 tw:bg-amber-50 tw:text-amber-700",
        info:
          "tw:border-sky-200 tw:bg-sky-50 tw:text-sky-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

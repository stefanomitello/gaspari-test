import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Dialog } from "./Dialog.vue";
export { default as DialogClose } from "./DialogClose.vue";
export { default as DialogContent } from "./DialogContent.vue";
export { default as DialogDescription } from "./DialogDescription.vue";
export { default as DialogFooter } from "./DialogFooter.vue";
export { default as DialogHeader } from "./DialogHeader.vue";
export { default as DialogOverlay } from "./DialogOverlay.vue";
export { default as DialogPortal } from "./DialogPortal.vue";
export { default as DialogTitle } from "./DialogTitle.vue";
export { default as DialogTrigger } from "./DialogTrigger.vue";

export const dialogOverlayVariants = cva(
  "tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80 tw:backdrop-blur-xs tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
);

export const dialogContentVariants = cva(
  "tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:grid tw:w-full tw:-translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:rounded-xl tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95",
  {
    variants: {
      size: {
        default: "tw:max-w-lg",
        sm: "tw:max-w-sm",
        md: "tw:max-w-md",
        lg: "tw:max-w-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type DialogOverlayVariants = VariantProps<typeof dialogOverlayVariants>;
export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;

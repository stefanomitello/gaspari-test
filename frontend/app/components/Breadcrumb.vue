<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  ariaLabel?: string
  separator?: string
  dark?: boolean
}

withDefaults(defineProps<BreadcrumbProps>(), {
  ariaLabel: "Percorso di navigazione",
  separator: "/",
})
</script>

<template>
  <nav class="breadcrumb-container" :aria-label="ariaLabel">
    <ol :class="['breadcrumb', dark && 'dark']">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`"
        :class="['breadcrumb-item', index === items.length - 1 && 'active']"
        :aria-current="index === items.length - 1 ? 'page' : undefined">
        <svg v-if="item.icon" class="icon icon-sm icon-secondary align-top me-1" aria-hidden="true">
          <use :href="`/sprites.svg#${item.icon}`" />
        </svg>
        <a v-if="index !== items.length - 1 && item.href" :href="item.href">{{ item.label }}</a>
        <span v-else>{{ item.label }}</span>
        <span v-if="index !== items.length - 1" class="separator" aria-hidden="true">{{ separator }}</span>
      </li>
    </ol>
  </nav>
</template>

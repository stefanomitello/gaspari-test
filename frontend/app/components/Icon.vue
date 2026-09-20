<script setup lang="ts">
import spriteUrl from "bootstrap-italia/dist/svg/sprites.svg?url"

interface IconProps {
  name: string
  title?: string
}

const props = defineProps<IconProps>()
const href = computed(() => `${spriteUrl}#${props.name}`)
</script>

<template>
  <svg class="icon" :role="title ? 'img' : undefined" :aria-hidden="title ? undefined : true">
    <title v-if="title">{{ title }}</title>
    <use :href="href" />
  </svg>
</template>

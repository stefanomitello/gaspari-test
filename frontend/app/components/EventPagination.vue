<script setup lang="ts">
interface EventPaginationProps {
  currentPage: number
  pageCount: number
}

defineProps<EventPaginationProps>()
const emit = defineEmits<{ change: [page: number] }>()
</script>

<template>
  <nav v-if="pageCount > 1" class="mt-5" aria-label="Paginazione degli eventi">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" type="button" :disabled="currentPage === 1" aria-label="Pagina precedente" @click="emit('change', currentPage - 1)"><Icon class="icon-sm" name="it-chevron-left" /></button>
      </li>
      <li v-for="page in pageCount" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <button class="page-link" type="button" :aria-label="`Pagina ${page}`" :aria-current="page === currentPage ? 'page' : undefined" @click="emit('change', page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === pageCount }">
        <button class="page-link" type="button" :disabled="currentPage === pageCount" aria-label="Pagina successiva" @click="emit('change', currentPage + 1)"><Icon class="icon-sm" name="it-chevron-right" /></button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface EventFiltersProps {
  categories: string[]
  modelValue: string
  selectedCategory: string
}

defineProps<EventFiltersProps>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  "update:selectedCategory": [value: string]
  reset: []
}>()
</script>

<template>
  <form class="event-filters p-4 p-lg-5" role="search" @submit.prevent>
    <div class="row g-4 align-items-end row-gap-3">
      <div class="col-lg-6 m-auto">
        <label class="form-label" for="event-search">Cerca un evento</label>
        <div class="input-group">
          <input id="event-search" :value="modelValue" class="form-control" type="search"
            placeholder="Titolo, luogo o parola chiave" aria-describedby="event-search-help"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
          <span class="input-group-text" aria-hidden="true">
            <Icon name="it-search" />
          </span>
        </div>
      </div>
      <div class="col-lg-4 m-auto">
        <label class="form-label" for="event-category">Categoria</label>
        <select id="event-category" :value="selectedCategory" class="form-select"
          @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)">
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-lg-2"><button class="btn btn-outline-primary w-100" type="button" @click="emit('reset')">Azzera
          filtri</button></div>
    </div>
  </form>
</template>

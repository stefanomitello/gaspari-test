<template>
  <section id="head-section">
    <h2 class="visually-hidden">Contenuti in evidenza</h2>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="card mb-5">
            <div class="card-body pb-5 px-0">
              <div class="category-top">
                <Icon name="it-calendar" class="icon-sm" aria-hidden="true" />
                <span class="title-xsmall-semi-bold fw-semibold">Notizie</span>
                <span class="data fw-normal">{{ new Date().toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }) }}</span>
              </div>
              <a :href="link.href" class="text-decoration-none">
                <h3 class="card-title">{{ title }}
                </h3>
              </a>
              <p class="mb-4 pt-3 lora">{{ paragraph }}</p>

              <Chip :label="category" />
              <a class="read-more pb-3" :href="link.href">
                <span class="text">{{ link.label }}</span>
                <Icon name="it-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 px-0 px-lg-3">
          <img :src="thumbnail.src" :title="thumbnail.title" :alt="thumbnail.alt" class="img-fluid"
            style="height: 100%;" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Icon from '~/components/Icon.vue';
import type { Image, Link } from '~/types';

export interface HomeHeroProps {
  thumbnail: Image;
  title: string;
  paragraph: string;
  category: string;
  date: string
  link: Link
}
defineProps<HomeHeroProps>()


</script>

<style scoped></style>
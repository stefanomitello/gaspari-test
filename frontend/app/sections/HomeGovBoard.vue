<template>
  <section id="governo">
    <div class="section section-muted pb-90 pb-lg-50 px-lg-5 pt-0">
      <div class="container">
        <div class="row mb-2">
          <div
            class="card-wrapper px-0 card-overlapping card-teaser-wrapper card-teaser-wrapper-equal card-teaser-block-3">
            <div v-for="role in boards" :key="role.name"
              class="card card-teaser no-after rounded shadow-sm border border-light "
              :class="{ 'card-teaser-image card-flex': role.image }">
              <div class="card-image-wrapper with-read-more">
                <div class="card-body p-3 pb-5">
                  <div class="category-top">
                    <span class="title-xsmall-semi-bold fw-semibold">Organi di governo</span>
                  </div>
                  <h3 class="card-title text-paragraph-medium u-grey-light">{{ role.name }}</h3>
                  <p class="text-paragraph-card u-grey-light m-0">{{ role.descr }}</p>
                </div>
                <div v-if="role.image" class="it-card-image-wrapper card-image card-image-rounded"
                  style="height: 100%;">
                  <img :src="role.image?.src" alt="Immagine di esempio" class="img-fluid" style="height: 100%;" />
                </div>
              </div>

              <a v-if="role.link" class="read-more ps-3" :href="role.link.href">
                <span class="text">{{ role.link.label }}</span>
                <Icon name="it-arrow-right" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import type { Image, Link } from '~/types';

export interface HomeGovBoardProps {
  name: string
  descr: string
  image?: Image
  link: Link
}
defineProps<{ boards: HomeGovBoardProps[] }>()
</script>

<style scoped></style>
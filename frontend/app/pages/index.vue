<template>
  <div>
    <HomeHero :="home.highlightNews" />
    <HomeGovBoard :boards="home.govRoles" />

    <section class="it-hero-wrapper it-text-centered">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="it-hero-text-wrapper bg-dark">
              <span class="it-category">Test tecnico</span>
              <h2>Guarda tutti gli eventi</h2>
              <p class="d-none d-lg-block">
                Vai alla pagina eventi per analizzare il lavoro fatto.
              </p>
              <div class="it-btn-container">
                <Button href="/eventi">Vai agli eventi</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { home } from '@/data/home.mock'

import HomeHero from '~/sections/HomeHero.vue';
import HomeGovBoard from '~/sections/HomeGovBoard.vue';


/* definePageMeta({
  layout: {
    name: 'default',
    props: {
      navbar: { items: [] },
    },
  },
}) */

</script>

<style scoped></style>
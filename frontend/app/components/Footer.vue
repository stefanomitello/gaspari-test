<script setup lang="ts">
import type { Link, Social } from '~/types'


export interface FooterLinkGroup {
  title: string
  links: Link[]
}

export interface FooterProps {
  name: string
  subtitle?: string,
  logoSrc: string,
  logoAlt?: string,
  contacts?: { type: 'ADDRESS' | 'EMAIL' | 'TEL', value: string }[]
  linkGroups?: FooterLinkGroup[]
  legalLinks?: Link[]
  socials?: Social[]
}

withDefaults(defineProps<FooterProps>(), {
  subtitle: "",
  linkGroups: () => [],
  legalLinks: () => [],
  socials: () => [],
})
</script>

<template>
  <footer class="it-footer">
    <div class="it-footer-main">
      <div class="container">
        <section>
          <div class="row clearfix">
            <div class="col-sm-12">
              <div class="it-brand-wrapper">
                <a href="#" data-focus-mouse="false">
                  <Icon class="icon-lg" :name="logoSrc || 'it-code-circle'" :title="logoAlt" />
                  <div class="it-brand-text">
                    <h2>{{ name }}</h2>
                    <h3 v-if="subtitle" class="d-none d-md-block">{{ subtitle }}</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="row">
            <div v-for="group in linkGroups" :key="group.title" class="col-lg-3 col-md-3 col-sm-6 pb-2">
              <h4>
                <a href="#" :title="`Vai alla pagina: ${group.title}`">{{ group.title }}</a>
              </h4>
              <div class="link-list-wrapper">
                <ul class="footer-list link-list clearfix">
                  <li v-for="link in group.links" :key="link.href">
                    <a class="list-item" :href="link.href">{{ link.label }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="py-4 border-white border-top">
          <div class="row">
            <div class="col-lg-4 col-md-4 pb-2">
              <h4>Contatti</h4>
              <p>
                <strong>{{ name }}</strong><br />
                Via Roma 0 - 00000 Lorem Ipsum <br />
                Codice fiscale / P. IVA: 000000000
              </p>
              <div class="link-list-wrapper">
                <ul class="footer-list link-list clearfix">
                  <li><a class="list-item" href="#">Posta Elettronica Certificata</a></li>
                  <li>
                    <a class="list-item" href="#">URP - Ufficio Relazioni con il Pubblico</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 pb-2">
              <h4>Lorem Ipsum</h4>
            </div>
            <div v-if="socials" class="col-lg-4 col-md-4 pb-2">
              <div class="pb-2">
                <h4>Seguici su</h4>
                <ul class="list-inline text-left social">
                  <li v-for="social in socials" :key="social.label" class="list-inline-item">
                    <a class="p-2 text-white" :href="social.href" :target="social.external ? '_blank' : '_self'">
                      <Icon :name="social.icon" class="icon icon-light" />
                      <span class="visually-hidden">{{ social.label }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-if="legalLinks" class="it-footer-small-prints clearfix">
      <div class="container">
        <!-- <h3 class="visually-hidden">Sezione Link Utili</h3> -->
        <ul class="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row">
          <li v-for="legal in legalLinks" :key="legal.label" class="list-inline-item">
            <a :href="legal.href" :target="legal.external ? '_blank' : '_self'">{{ legal.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

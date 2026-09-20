<script setup lang="ts">
import type { Social } from "~/types";

export interface HeaderProps {
  name: string;
  homeHref?: string;
  subtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
  owner?: string;
  ownerUrl?: string;
  theme?: "default" | "light";
  socials: Social[];
}

withDefaults(defineProps<HeaderProps>(), {
  homeHref: "/",
  logoAlt: "",
  ownerUrl: "#",
  theme: "default",
});

const { isAuthenticated, user, logout } = useAuth();
</script>

<template>
  <header class="it-header-wrapper">
    <div v-if="owner || $slots.slim" :class="['it-header-slim-wrapper', theme === 'light' && 'theme-light']">
      <div class="container-xxl">
        <div class="row">
          <div class="col-12">
            <div class="it-header-slim-wrapper-content">
              <a v-if="owner" class="navbar-brand" :href="ownerUrl">
                {{ owner }}
              </a>
              <slot name="slim">
                <div v-if="isAuthenticated" class="d-flex align-items-center gap-2">
                  <NuxtLink to="/admin"
                    class="btn btn-sm btn-primary text-white d-inline-flex align-items-center gap-1">
                    <Icon name="it-user" class="icon icon-xs icon-white" />
                    <span>{{ 'Ciao, ' + user?.name || "Area Personale" }}</span>
                  </NuxtLink>

                </div>
                <Button v-else href="/login" size="sm" icon="it-user" class="rounded-icon">Accedi all'area
                  personale</Button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['it-header-center-wrapper', theme === 'light' && 'theme-light']">
      <div class="container-xxl">
        <div class="row">
          <div class="col-12">
            <div class="it-header-center-content-wrapper">
              <div class="it-brand-wrapper">
                <a :href="homeHref">
                  <div class="it-brand-text d-flex align-items-center">
                    <Icon class="icon-sm" :name="logoSrc || 'it-code-circle'" :title="logoAlt" />
                    <div>
                      <div class="it-brand-title">{{ name }}</div>
                      <div v-if="subtitle" class="it-brand-tagline d-none d-md-block">
                        {{ subtitle }}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <slot name="actions">
                <div class="it-right-zone">
                  <div v-if="socials" class="it-socials d-none d-md-flex">
                    <span>Seguici su</span>
                    <ul>
                      <li v-for="social in socials" :key="social.label">
                        <a :href="social.href" :target="social.external ? '_blank' : '_self'">
                          <Icon :name="social.icon" :title="social.label" class="icon-light" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="it-search-wrapper">
                    <span class="d-none d-md-block">Cerca</span>
                    <a class="search-link rounded-icon" aria-label="Cerca nel sito" href="#">
                      <Icon name="it-search" />
                    </a>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot name="navigation" />
  </header>
</template>

<script setup lang="ts">
export interface NavbarItem {
  label: string
  href: string
  active?: boolean
  disabled?: boolean
}

export interface NavbarProps {
  items: NavbarItem[]
  id?: string
  ariaLabel?: string
  theme?: "default" | "light"
}

const props = withDefaults(defineProps<NavbarProps>(), {
  id: "main-navigation",
  ariaLabel: "Navigazione principale",
  theme: "default",
})

const isOpen = ref(false)
const collapseId = computed(() => `${props.id}-collapse`)
const classes = computed(() => [
  "it-header-navbar-wrapper",
  props.theme === "light" && "theme-light",
])

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <div :class="classes">
    <div class="container-xxl">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-lg has-megamenu" :aria-label="ariaLabel">
            <button class="custom-navbar-toggler" type="button" :aria-controls="collapseId"
              :aria-expanded="isOpen" aria-label="Mostra o nascondi la navigazione" @click="isOpen = !isOpen">
              <Icon class="bg-override" name="it-burger" />
            </button>
            <div :id="collapseId" :class="['navbar-collapsable', isOpen && 'expanded']" tabindex="-1"
              @keydown.esc="closeMenu">
              <div class="overlay fade" @click="closeMenu" />
              <div class="close-div">
                <button class="btn close-menu" type="button" @click="closeMenu">
                  <span class="visually-hidden">Nascondi la navigazione</span>
                  <Icon name="it-close-big" />
                </button>
              </div>
              <div class="menu-wrapper">
                <ul class="navbar-nav">
                  <li v-for="item in items" :key="item.href" :class="['nav-item', item.active && 'active']">
                    <a :class="['nav-link', item.active && 'active', item.disabled && 'disabled']"
                      :href="item.disabled ? undefined : item.href" :aria-current="item.active ? 'page' : undefined"
                      :aria-disabled="item.disabled || undefined" :tabindex="item.disabled ? -1 : undefined"
                      @click="closeMenu">
                      <span>{{ item.label }}</span>
                    </a>
                  </li>
                  <slot />
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

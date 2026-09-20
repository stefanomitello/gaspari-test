<script setup lang="ts">
import {
  ExternalLink,
  Home,
  LogOut,
  ShieldCheck,
  User as UserIcon,
} from "lucide-vue-next"

const { user, logout } = useAuth()

const { settings } = useSettings()


async function handleLogout() {
  await logout()
}
</script>

<template>
  <div class="">
    <header
      class="tw:sticky tw:top-0 tw:z-40 tw:w-full tw:border-b tw:border-border/70 tw:bg-background/95 tw:backdrop-blur-md tw:shadow-xs">
      <div class="tw:mx-auto tw:max-w-7xl tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div class="tw:flex tw:h-16 tw:items-center tw:justify-between tw:gap-4">
          <div class="tw:flex tw:items-center tw:gap-3">
            <NuxtLink to="/admin"
              class="tw:flex tw:items-center tw:gap-2.5 tw:font-semibold tw:text-lg tw:tracking-tight tw:transition-colors hover:tw:opacity-85 tw:no-underline!">
              <div
                class="tw:flex tw:size-9 tw:items-center tw:justify-center tw:rounded-lg tw:bg-primary tw:text-primary-foreground tw:shadow-xs">
                <ShieldCheck class="tw:size-5" />
              </div>
              <div class="tw:flex tw:flex-col ">
                <span class="tw:leading-none tw:font-bold tw:text-slate-900 ">
                  {{ settings?.app_name || 'Vivi Bugliano' }}
                </span>
                <span class="tw:text-xs tw:font-normal tw:text-muted-foreground">Area Riservata</span>
              </div>
            </NuxtLink>
          </div>

          <div class="tw:flex tw:items-center tw:gap-3">
            <NuxtLink to="/"
              class="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground hover:tw:text-foreground tw:transition-colors tw:px-2.5 tw:py-1.5 tw:rounded-md hover:tw:bg-secondary">
              <ExternalLink class="tw:size-3.5" />
              <span class="tw:hidden tw:sm:inline">Sito pubblico</span>
            </NuxtLink>

            <div class="tw:h-4 tw:w-px tw:bg-border" />

            <div class="tw:flex tw:items-center tw:gap-2">
              <UiAvatar size="sm" class="tw:border tw:border-border">
                <UiAvatarFallback class="tw:bg-primary/10 tw:text-primary tw:font-semibold">
                  {{ userInitials(user?.name || '') }}
                </UiAvatarFallback>
              </UiAvatar>
              <div class="tw:hidden tw:md:flex tw:flex-col tw:text-left">
                <span class="tw:text-xs tw:font-medium tw:leading-none tw:text-slate-900">{{ user?.name }}</span>
                <span class="tw:text-[11px] tw:text-muted-foreground">{{ user?.email }}</span>
              </div>
            </div>

            <UiButton variant="destructive" size="icon-sm"
              class="tw:text-muted-foreground hover:tw:text-destructive hover:tw:bg-destructive/10" title="Disconnetti"
              @click="handleLogout">
              <LogOut class="tw:size-4" />
              <span class="tw:sr-only">Esci</span>
            </UiButton>
          </div>
        </div>

        <div class="tw:flex tw:items-center tw:py-2.5 tw:border-t tw:border-border/40">
          <UiBreadcrumb>
            <UiBreadcrumbList>
              <UiBreadcrumbItem>
                <UiBreadcrumbLink href="/" class="tw:inline-flex tw:items-center tw:gap-1.5 hover:tw:text-foreground">
                  <Home class="tw:size-3.5" />
                  <span>Home</span>
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <UiBreadcrumbSeparator />
              <UiBreadcrumbItem>
                <UiBreadcrumbLink href="/admin" class="hover:tw:text-foreground">
                  Area Riservata
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <UiBreadcrumbSeparator />
              <UiBreadcrumbItem>
                <UiBreadcrumbPage class="tw:font-medium tw:text-foreground">
                  Profilo
                </UiBreadcrumbPage>
              </UiBreadcrumbItem>
            </UiBreadcrumbList>
          </UiBreadcrumb>
        </div>
      </div>
    </header>
    <slot />
    <footer class="tw:mt-auto tw:border-t tw:border-border/70 tw:bg-background tw:py-6">
      <div class="tw:mx-auto tw:max-w-7xl tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div class="tw:flex tw:flex-col tw:items-center tw:justify-between tw:gap-4 tw:sm:flex-row">
          <div class="tw:flex tw:items-center tw:gap-2">
            <span class="tw:text-xs tw:text-muted-foreground">
              {{ settings?.app_name || 'Comune di Bugliano' }}
            </span>
          </div>

          <div class="tw:flex tw:items-center tw:gap-6 tw:text-xs tw:text-muted-foreground">
            <NuxtLink to="/" class="hover:tw:text-foreground tw:transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/eventi" class="hover:tw:text-foreground tw:transition-colors">
              Tutti gli Eventi
            </NuxtLink>
          </div>

          <p class="tw:text-xs tw:text-muted-foreground tw:m-0!">
            © 2026 Comune di Bugliano. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
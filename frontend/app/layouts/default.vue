<template>
	<div class="public-site">
		<a class="visually-hidden-focusable skip-link" href="#main-content">Vai al contenuto principale</a>

		<Header :="{ ...header }">
			<template #navigation>
				<Navbar :items="navbar.items" />
			</template>
		</Header>

		<main id="main-content" tabindex="-1">
			<slot />
		</main>

		<Footer :="footer" />
	</div>
</template>

<script setup lang="ts">
import type { FooterProps } from '~/components/Footer.vue';
import type { HeaderProps } from '~/components/Header.vue';
import type { NavbarProps } from '~/components/Navbar.vue';

const props = defineProps<{
	header: HeaderProps
	navbar: NavbarProps
	footer: FooterProps
}>()

</script>
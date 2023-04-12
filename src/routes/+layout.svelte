<script lang="ts">
	import '../styles/tailwind.css';
	import '../styles/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { openDrawer } from '$lib/stores';
	import { MenuIcon } from 'svelte-feather-icons';

	// variables
	let links = [
		{ id: 1, title: 'Home', href: '/' },
		{ id: 2, title: 'Progress', href: '/progress' }
	];
</script>

<div class="bg-[#030712] text-white">
	<button on:click={() => ($openDrawer = true)} class="fixed top-8 left-12">
		<MenuIcon size="2x" strokeWidth={1.5} />
	</button>

	<Navbar on:clickAway={() => ($openDrawer = false)} size="350px" open={$openDrawer}>
		<div class="p-12">
			<ul>
				{#each links as l (l.id)}
					<li class="my-4">
						<a
							href={l.href}
							class="font-semibold uppercase hover:underline hover:text-indigo-400"
							on:click={() => ($openDrawer = false)}>{l.title}</a
						>
					</li>
				{/each}
			</ul>
		</div></Navbar
	>
	<slot />
</div>

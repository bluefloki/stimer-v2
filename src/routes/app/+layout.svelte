<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { openDrawer, task } from '$lib/stores';
	import { onMount } from 'svelte';
	import { MenuIcon } from 'svelte-feather-icons';

	// variables
	let links = [
		{ id: 1, title: 'Home', href: '/app/' },
		{ id: 2, title: 'Progress', href: '/app/progress' }
	];

	// clear ui on app dismount / reload
	onMount(() => {
		return () => {
			$task = { title: '', timeInSeconds: 0 };
		};
	});
</script>

<div>
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
				<li class="my-4">
					<form action="/logout" method="post">
						<button
							class="font-semibold uppercase hover:underline hover:text-indigo-400"
							type="submit"
							on:click={() => ($openDrawer = false)}>logout</button
						>
					</form>
				</li>
			</ul>
		</div></Navbar
	>
	<slot />
</div>

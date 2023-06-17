<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { completedTasks as tasks } from '$lib/stores';
	import { Circle } from 'svelte-loading-spinners';
	import { supabase } from '$lib/supabase';
	import moment from 'moment';
	import type { Task } from '$lib/types';

	let dates: string[] = [];
	let loading = true;

	onMount(async () => {
		loading = true;
		if ($tasks.length === 0) {
			const { data, error } = await supabase.from('tasks').select('*').limit(200);
			if (error) throw error;
			$tasks = data as Task[];
		}
		dates = [...new Set($tasks.map((el) => moment(el.createdAt).format('dddd, MMMM Do YYYY')))];
		dates = dates.sort((a, b) => moment(a).valueOf() - moment(b).valueOf()).reverse();
		loading = false;
	});
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<div class="mt-12">
		{#if loading}
			<div class="flex flex-col items-center justify-center">
				<div>
					<Circle size="36" color="white" unit="px" duration="0.5s" />
				</div>
			</div>
		{:else if !loading && $tasks.length === 0}
			<h3 class="text-2xl" in:fly={{ x: 100 }}>There are no tasks</h3>
		{:else}
			{#each dates as d}
				<div class="my-6">
					<h3 class="font-bold text-2xl">{d}</h3>
					{#each $tasks as t}
						<div class="flex flex-row items-center gap-4 text-lg py-2">
							<h4 class="font-semibold">{t.title}</h4>
							<p>{t.timeInSeconds}s</p>
						</div>
					{/each}
				</div>
			{/each}
		{/if}
	</div>
</main>

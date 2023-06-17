<script lang="ts">
	import { onMount } from 'svelte';
	import { completedTasks as tasks } from '$lib/stores';
	import { Circle } from 'svelte-loading-spinners';
	import { supabase } from '$lib/supabase';
	import moment from 'moment';
	import type { Task } from '$lib/types';
	import { ArrowRightIcon } from 'svelte-feather-icons';
	import { formatTimeWihoutZeroes } from '$lib/utils';

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

<main>
	{#if loading}
		<div class="h-screen flex flex-col items-center justify-center">
			<div>
				<Circle size="36" color="white" unit="px" duration="0.5s" />
			</div>
		</div>
	{:else if !loading && $tasks.length === 0}
		<div class="h-screen flex flex-col items-center justify-center">
			<h3 class="text-xl">There are no tasks</h3>
		</div>
	{:else}
		<div class="h-screen flex flex-col items-start justify-start py-20 px-12 md:py-24 md:px-60">
			<h1 class="font-semibold text-4xl md:text-5xl gradient-text py-6">Progress</h1>
			{#each dates as d}
				<div class="my-6">
					<h3 class="font-bold text-2xl">{d}</h3>
					{#each $tasks as t}
						<div class="flex flex-row items-center gap-4 text-xl py-2">
							<ArrowRightIcon size="1.3x" strokeWidth={1} class="-mr-2" />
							<h4 class="">{t.title}</h4>
							<p class="text-purple-300 font-medium">{formatTimeWihoutZeroes(t.timeInSeconds)}</p>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</main>

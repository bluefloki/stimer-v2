<script lang="ts">
	import { createForm } from 'felte';
	import { formatTime } from '../lib/utils';
	import { supabase } from '$lib/supabase';

	// load
	import type { GlobalData } from '$lib/types';

	/** @type {import('./$types').PageData} */
	export let data;

	// variables
	let active = false;
	let timeInSeconds: number = 0;
	let timerInterval: any;
	let title: string = '';
	let globalData: GlobalData = data.globalData;

	// functions
	const {
		form,
		handleSubmit,
		reset,
		data: formData
	} = createForm({
		onSubmit: (values) => {
			title = values.title;
		}
	});
	const startTimer = async () => {
		if ($formData.title != '') {
			active = true;
			if (title == '') handleSubmit();
			timerInterval = setInterval(() => timeInSeconds++, 1000);
		}
	};
	const stopTimer = async () => {
		clearInterval(timerInterval);
		active = false;
	};

	const split = async () => {
		if (title != '') {
			stopTimer();
			if (timeInSeconds != 0) {
				// append to tasks
				await supabase.from('tasks').insert({
					title: $formData.title,
					timeInSeconds
				});
				//update total
				globalData.value.totalTimeSpent += timeInSeconds;
				await supabase.from('globals').update(globalData).eq('id', globalData.id);
			}

			title = '';
			reset();
			timeInSeconds = 0;
		}
	};
</script>

<main class="h-screen flex flex-col items-center justify-center">
	{#if title == ''}
		<form use:form class="w-1/2 text-center">
			<input
				type="text"
				name="title"
				placeholder="What are you working on?"
				class="input border-none text-xl text-center w-1/2"
			/>
		</form>
	{:else}
		<h3 class="text-2xl underline w-1/2 text-center">{title}</h3>
	{/if}
	<div class="text-6xl font-bold pt-6 pb-16">{formatTime(timeInSeconds)}</div>
	{#if active}
		<button class="btn btn-primary px-12 mb-6" on:click={stopTimer}>pause</button>
	{:else}
		<button class="btn btn-primary px-12 mb-6" on:click={startTimer}>play</button>
	{/if}

	<button
		class="text-sm font-semibold uppercase hover:underline hover:text-indigo-400 cursor-pointer"
		on:click={split}
	>
		split
	</button>
</main>

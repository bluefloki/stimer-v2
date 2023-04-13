<script lang="ts">
	import { createForm } from 'felte';
	import { formatTime } from '../../lib/utils';
	import { supabase } from '$lib/supabase';
	import type { GlobalData } from '$lib/types';
	import { task } from '$lib/stores';
	import { onMount } from 'svelte';
	import classnames from 'classnames';

	// load
	/** @type {import('./$types').PageData} */
	export let data;

	// variables
	let active = false;
	let loading = false;
	let timerInterval: any;
	let autosaveInterval: any;
	let globalData: GlobalData = data.globalData;

	// functions
	const {
		form,
		handleSubmit,
		reset,
		data: formData
	} = createForm({
		onSubmit: (values) => {
			$task.title = values.title;
		}
	});
	const startTimer = async () => {
		if ($task.title != '') {
			active = true;
			timerInterval = setInterval(() => $task.timeInSeconds++, 1000);
		}
	};
	const stopTimer = async () => {
		clearInterval(timerInterval);
		active = false;
	};

	const split = async () => {
		if ($task.title != '') {
			loading = true;
			stopTimer();
			if ($task.timeInSeconds != 0) {
				// append to tasks
				await supabase.from('tasks').insert({
					title: $task.title,
					timeInSeconds: $task.timeInSeconds
				});
				//update total
				globalData.value.totalTimeSpent += $task.timeInSeconds;
				await supabase.from('globals').update(globalData, {}).eq('id', globalData.id);
			}

			loading = false;

			$task.title = '';
			reset();
			$task.timeInSeconds = 0;
		}
	};

	onMount(() => {
		return () => stopTimer();
	});
</script>

<main class="h-screen flex flex-col items-center justify-center">
	{#if $task.title == ''}
		<form use:form class="w-1/2 text-center">
			<input
				type="text"
				name="title"
				placeholder="What are you working on?"
				class="input border-none text-xl text-center w-1/2"
			/>
		</form>
	{:else}
		<h3 class="text-2xl underline w-1/2 text-center">{$task.title}</h3>
	{/if}
	<div
		class={classnames('text-6xl font-bold pt-6 pb-16', {
			'gradient-text': loading
		})}
	>
		{formatTime($task.timeInSeconds)}
	</div>
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

<script lang="ts">
	import { createForm } from 'felte';
	import { formatTime } from '../../lib/utils';
	import { supabase } from '$lib/supabase';
	import { completedTasks, task } from '$lib/stores';
	import { onMount } from 'svelte';
	import classnames from 'classnames';
	import type { Task } from '$lib/types';

	// loading data
	// /** @type {import('./$types').PageData} */ export let data;

	// variables
	let active = false;
	let loading = false;
	let timerInterval: any;
	// let globalData = data.globalData;

	// functions
	const {
		form,
		reset,
		data: formData
	} = createForm({
		onSubmit: (values) => {
			$task.title = values.title;
		}
	});

	// function to insert into db and total time spent
	const updateTime = async () => {
		loading = true;

		const { data: res } = await supabase
			.from('tasks')
			.insert({
				title: $task.title,
				timeInSeconds: $task.timeInSeconds
			})
			.select()
			.single();

		// append completed tasks list
		if ($completedTasks.length != 0) {
			$completedTasks = [...$completedTasks, res as Task];
		}

		// if ($task.id == undefined) $task.id = data!['id'];

		//update total
		// globalData.value.totalTimeSpent += $task.timeInSeconds;
		// await supabase.from('globals').update(globalData, {}).eq('id', 4);

		loading = false;
	};

	// start time
	const startTimer = async () => {
		if ($task.title != '') {
			active = true;
			timerInterval = setInterval(() => $task.timeInSeconds++, 1000);
			// autosaveInterval = setInterval(() => updateTime(), 1000 * 60 * 10);
		}
	};
	//stop time
	const stopTimer = async () => {
		clearInterval(timerInterval);
		// clearInterval(autosaveInterval);
		active = false;
	};

	// save time and reset ui
	const split = async () => {
		if ($task.title != '') {
			stopTimer();
			if ($task.timeInSeconds != 0) updateTime();
			$task.title = '';
			$task.timeInSeconds = 0;
			reset();
		}
	};

	// stop the timer when the component dismounts
	onMount(() => {
		return () => {
			stopTimer();
		};
	});
</script>

<main class="h-screen flex flex-col items-center justify-center">
	{#if $task.title == ''}
		<form use:form class="md:w-1/2 text-center">
			<input
				type="text"
				name="title"
				placeholder="What are you working on?"
				class="input border-none text-xl text-center w-1/2"
			/>
		</form>
	{:else}
		<h3 class="text-2xl underline px-4 md:px-0 md:w-1/2 text-center h-auto">
			{$task.title}
		</h3>
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

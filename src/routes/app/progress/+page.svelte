<script lang="ts">
	import type { GlobalData } from '$lib/types';
	import { getDifferenceInDays, getTotalHours } from '$lib/utils';

	// load
	/** @type {import('./$types').PageData} */
	export let data;

	// variables
	let globalData: GlobalData = data.globalData;

	console.log(globalData.createdAt);
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<h3 class="text-5xl font-bold max-w-2/3">
		You have worked <span class="gradient-text"
			>{getTotalHours(globalData.value.totalTimeSpent)} hours</span
		>
		in the past
		<span class="gradient-text">{getDifferenceInDays(globalData.createdAt)} days</span>.
	</h3>
</main>

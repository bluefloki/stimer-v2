<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import * as zod from 'zod';

	// variables
	let loading;

	// functions
	const schema = zod.object({
		username: zod.string().min(1, 'username is required'),
		password: zod.string().min(1, 'Password should be at least 8 characters')
	});
</script>

<div class="px-12 pt-12 flex flex-col justify-center items-center gap-10 h-screen">
	<form method="post" class="w-full lg:w-1/3 2xl:w-1/4">
		<div class="mb-6">
			<label for="username" class="font-semibold lg:text-xl block mb-2">Username</label>
			<input
				type="text"
				name="username"
				placeholder="username"
				class="input input-primary"
				required
			/>
		</div>
		<div class="mb-12 md:mb-6">
			<label for="password" class="font-semibold lg:text-xl block mb-2">Password</label>
			<input
				type="password"
				name="password"
				placeholder="password"
				class="input input-primary"
				required
			/>
		</div>
		<button class="btn btn-primary w-full mt-6" type="submit" disabled={loading}>
			{#if loading}
				<div class="flex flex-col items-center justify-center">
					<Circle color="#ffffff" unit="px" size="28" duration="0.5s" />
				</div>
			{:else}
				Login
			{/if}
		</button>
	</form>
</div>

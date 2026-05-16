<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import Barchart from '$lib/components/barchart.svelte';

	import XIcon from 'phosphor-svelte/lib/XIcon';
	import CalendarIcon from 'phosphor-svelte/lib/CalendarIcon';
	import ClockIcon from 'phosphor-svelte/lib/ClockIcon';
	import ChatIcon from 'phosphor-svelte/lib/ChatIcon';
	import QuestionIcon from 'phosphor-svelte/lib/QuestionIcon';
	import ScreencastIcon from 'phosphor-svelte/lib/ScreencastIcon';
</script>

<div class="mx-auto mt-5 max-w-7xl">
	{#if data.session.success}
		<div class="flex items-center">
			<div class="flex-1">
				<span class="badge badge-soft badge-info">
					<ScreencastIcon weight="bold" />
					Active Session
				</span>
				<h1 class="flex items-center text-2xl">
					<QuestionIcon weight="bold" />
					<span class="mr-3 ml-1"> "{data.session.data.question}" </span>
					<ChatIcon weight="bold" class="mr-1" />
					{data.session.data.votes.reduce((acc, num) => acc + num, 0)}
					responses
				</h1>
			</div>
			<form method="POST" action="?/sessionstop">
				<button class="btn btn-soft btn-error">
					<XIcon weight="bold" />
					Stop Session
				</button>
			</form>
		</div>
		<Barchart votes={data.session.data.votes} />
	{:else}
		{data.session.message}

		{#if data.devices.success}
			<form method="POST" action="?/sessionstart">
				<select class="select" name="device_id" required>
					<option disabled selected>Select a device</option>
					{#each data.devices.data as device (device.id)}
						{#if device.available}
							<option value={device.id}>{device.id} - {device.room}</option>
						{/if}
					{/each}
				</select>
				<input type="text" name="question" class="input" required />

				<button class="btn btn-soft btn-primary"> Start Session </button>
			</form>
		{/if}
	{/if}
</div>

{#if data.history.success}
	<div class="mx-auto flex max-w-7xl flex-col">
		<h2 class="text-2xl font-medium">Session History</h2>
		{#each data.history.data as history (history.id)}
			<div class="my-1 rounded-box bg-base-300 p-4">
				<div class="flex flex-col">
					<p>{history.question}</p>
					<p class="flex items-center text-base-content/50">
						<CalendarIcon weight="bold" class="mr-1" />
						{new Date(history.date).toLocaleDateString('nl-NL')}
						<ClockIcon weight="bold" class="ml-1" />
						{new Date(history.date).getHours() + ':' + new Date(history.date).getMinutes()}
					</p>
				</div>
			</div>
		{/each}
	</div>
{:else}
	{data.history.message}
{/if}

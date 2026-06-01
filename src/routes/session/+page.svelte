<script lang="ts">
	//imports
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import Barchart from '$lib/components/barchart.svelte';
	import Sessioncard from '$lib/components/sessioncard.svelte';

	// icons
	import XIcon from 'phosphor-svelte/lib/XIcon';
	import ChatIcon from 'phosphor-svelte/lib/ChatIcon';
	import QuestionIcon from 'phosphor-svelte/lib/QuestionIcon';
	import ScreencastIcon from 'phosphor-svelte/lib/ScreencastIcon';
	import MapPinIcon from 'phosphor-svelte/lib/MapPinIcon';
	import UsbIcon from 'phosphor-svelte/lib/UsbIcon';

	// vars
	let selectedId: number = $state(0);
	let question: string = $state('');
	let wizardStep: number = $state(1);

	// refrsh
	let interval: ReturnType<typeof setInterval> | undefined;

	$effect(() => {
		if (data.session.success) {
			interval = setInterval(() => {
				invalidate('app:session');
			}, 5000);
		} else {
			clearInterval(interval);
		}
	});

	onDestroy(() => clearInterval(interval));
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
	{:else if data.devices.success}
		<div class="flex flex-col items-center">
			<ul class="steps mb-6">
				<li class="step" class:step-primary={wizardStep >= 1}>Choose Device</li>
				<li class="step" class:step-primary={wizardStep >= 2}>Ask Question</li>
				<li class="step" class:step-primary={wizardStep >= 3}>Start Session</li>
			</ul>

			<form method="POST" action="?/sessionstart" use:enhance class="w-full max-w-4xl">
				{#if wizardStep == 1}
					<div class="flex flex-col">
						<h2 class="text-2xl font-medium">Select a Device</h2>
						<p class="text-lg">Select one device to continue</p>
						<div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
							{#if data.devices.data.some((d) => d.available)}
								{#each data.devices.data as device (device.id)}
									{#if device.available}
										<div
											role="button"
											tabindex="0"
											class="col-span-1 flex cursor-pointer flex-col items-center rounded-box bg-base-300 py-10 transition
                    {selectedId === device.id ? 'ring-2 ring-primary' : ''}"
											onclick={() => (selectedId = device.id)}
											onkeydown={(e) => {
												if (e.key === ' ' || e.key === 'Enter') selectedId = device.id;
											}}
											aria-pressed={selectedId === device.id}
										>
											<h3 class="text-xl font-medium">Device {device.id}</h3>
											<div class="flex items-center">
												<MapPinIcon weight="bold" class="mr-1" />
												{device.room}
											</div>
										</div>
									{/if}
								{/each}
							{:else}
								<div
									class="col-span-1 flex items-center justify-center gap-1 rounded-box bg-base-300 py-10 text-warning"
								>
									<XIcon weight="bold" />
									No available devices found
								</div>
							{/if}
						</div>
						<div class="flex justify-end">
							<button
								type="button"
								class="btn btn-soft btn-primary"
								disabled={selectedId === 0}
								onclick={() => wizardStep++}
							>
								Next
							</button>
						</div>
					</div>
				{:else if wizardStep == 2}
					<div class="flex flex-col">
						<h2 class="text-2xl font-medium">Ask a Question</h2>
						<p class="text-lg">Your question will be sent to device {selectedId}.</p>
						<input
							type="text"
							name="question"
							class="input input-lg my-4 w-full"
							placeholder="How would you rate today's class?"
							bind:value={question}
							required
						/>
						<div class="flex justify-between">
							<button type="button" class="btn btn-soft" onclick={() => wizardStep--}>
								Previous
							</button>
							<button type="button" class="btn btn-soft btn-primary" onclick={() => wizardStep++}>
								Next
							</button>
						</div>
					</div>
				{:else}
					<div class="flex flex-col gap-4">
						<h2 class="text-2xl font-medium">Start Session</h2>
						<div class="flex items-center gap-1 rounded-box bg-base-300 p-4">
							<UsbIcon weight="bold" />
							You selected device {selectedId}
						</div>
						<div class="flex items-center gap-1 rounded-box bg-base-300 p-4">
							<QuestionIcon weight="bold" />
							Your question is {question}
						</div>

						<input type="hidden" name="device_id" value={selectedId} />
						<input type="hidden" name="question" value={question} />

						<div class="flex justify-between">
							<button type="button" class="btn btn-soft" onclick={() => wizardStep--}>
								Previous
							</button>
							<button class="btn btn-soft btn-lg btn-primary">Start Session</button>
						</div>
					</div>
				{/if}
			</form>
		</div>
	{/if}
</div>

{#if data.history.success}
	<div class="mx-auto flex max-w-7xl flex-col">
		<h2 class="text-2xl font-medium">Session History</h2>
		{#each data.history.data as history (history.id)}
			<Sessioncard data={history} />
		{/each}
	</div>
{:else}
	{data.history.message}
{/if}

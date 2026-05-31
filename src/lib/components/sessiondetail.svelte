<script lang="ts">
	import type { Session } from '$lib/types';
	let { data }: { data: Session } = $props();

	import Barchart from '$lib/components/barchart.svelte';

	import PlayIcon from 'phosphor-svelte/lib/PlayIcon';
	import StopIcon from 'phosphor-svelte/lib/StopIcon';
	import NumberOneIcon from 'phosphor-svelte/lib/NumberOneIcon';
	import HandPalmIcon from 'phosphor-svelte/lib/HandPalmIcon';

	import ArrowArcLeftIcon from 'phosphor-svelte/lib/ArrowArcLeftIcon';

	import { formatShort, getTime } from '$lib/time';
</script>

<div class="flex items-center">
	<div class="flex flex-col">
		<h1 class="text-2xl font-medium">{data.question}</h1>
		{formatShort(data.date)}
	</div>
</div>

<Barchart votes={data.votes} />

<ul class="timeline timeline-horizontal w-full">
	<li class="flex-1">
		<div class="timeline-start">{getTime(data.date)}</div>
		<div class="timeline-middle">
			<div class="flex size-8 items-center justify-center rounded-full bg-primary">
				<PlayIcon weight="bold" class="size-4 text-primary-content" />
			</div>
		</div>
		<div class="timeline-end timeline-box">Session started</div>
		<hr class="bg-primary" />
	</li>
	<li class="flex-1">
		<hr class="bg-primary" />
		<div class="timeline-start">{getTime(data.first_answer_time)}</div>
		<div class="timeline-middle">
			<div class="flex size-8 items-center justify-center rounded-full bg-primary">
				<NumberOneIcon weight="bold" class="size-4 text-primary-content" />
			</div>
		</div>
		<div class="timeline-end timeline-box">First vote received</div>
		<hr class="bg-primary" />
	</li>
	<li class="flex-1">
		<hr class="bg-primary" />
		<div class="timeline-start">{getTime(data.last_answer_time)}</div>
		<div class="timeline-middle">
			<div class="flex size-8 items-center justify-center rounded-full bg-primary">
				<HandPalmIcon weight="bold" class="size-4 text-primary-content" />
			</div>
		</div>
		<div class="timeline-end timeline-box">Last vote received</div>
		<hr class="bg-primary" />
	</li>
	{#if typeof data.stopped_at == 'string'}
		<li class="flex-1">
			<hr class="bg-primary" />
			<div class="timeline-start">{getTime(data.stopped_at)}</div>
			<div class="timeline-middle">
				<div class="flex size-8 items-center justify-center rounded-full bg-primary">
					<StopIcon weight="bold" class="size-4 text-primary-content" />
				</div>
			</div>
			<div class="timeline-end timeline-box">Session stopped</div>
		</li>
	{/if}
</ul>

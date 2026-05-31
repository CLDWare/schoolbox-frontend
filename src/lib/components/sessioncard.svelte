<script lang="ts">
	let { data } = $props();

	import Barchart from '$lib/components/barchart.svelte';

	import CalendarIcon from 'phosphor-svelte/lib/CalendarIcon';
	import ClockIcon from 'phosphor-svelte/lib/ClockIcon';
</script>

<div class="rounded-box bg-base-100 px-4">
	<div class="mt-2 flex">
		<h2 class="flex-1">{data.question}</h2>
		<p class="flex items-center text-base-content/50">
			<CalendarIcon weight="bold" class="mr-1" />
			{new Date(data.date).toLocaleDateString('nl-NL')}
			<ClockIcon weight="bold" class="ml-1" />
			{new Date(data.date).getHours() + ':' + new Date(data.date).getMinutes()}
		</p>
	</div>
	<Barchart votes={data.votes} />
</div>

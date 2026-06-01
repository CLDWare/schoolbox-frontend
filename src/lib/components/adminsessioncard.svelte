<script lang="ts">
	let { data } = $props();
	import { resolve } from '$app/paths';

	import CalendarIcon from 'phosphor-svelte/lib/CalendarIcon';
	import ClockIcon from 'phosphor-svelte/lib/ClockIcon';

	import { formatShort, getTime } from '$lib/time';
</script>

<a class="my-1 rounded-box bg-base-300 p-4" href={resolve(`/admin/sessions/${data.id}`)}>
	<div class="flex">
		<div class="flex flex-1 flex-col">
			<p>{data.question}</p>
			<p class="flex items-center text-base-content/50">
				<CalendarIcon weight="bold" class="mr-1" />
				{formatShort(data.date)}
				<ClockIcon weight="bold" class="ml-1" />
				{getTime(data.date)}
			</p>
		</div>
		<div>helllo</div>
	</div>
</a>

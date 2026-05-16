<script lang="ts">
	import { onMount } from 'svelte';
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { daisyChartColors } from '$lib/chartColors';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let data = $state();
	let { votes = [] }: { votes: number[] } = $props();

	onMount(() => {
		const bg = daisyChartColors(0.4);
		const border = daisyChartColors(1.0);

		data = {
			labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
			datasets: [
				{
					label: 'amount of votes',
					data: votes,
					backgroundColor: bg,
					borderColor: border,
					borderWidth: 2,
					borderRadius: 15
				}
			]
		};
	});
</script>

{#if data}
	<Bar {data} options={{ responsive: true }} />
{/if}

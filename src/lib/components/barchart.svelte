<script lang="ts">
	import { browser } from '$app/environment';
	import { Bar } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		type ChartData
	} from 'chart.js';
	import { daisyChartColors } from '$lib/chartColors';
	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let { votes = [] }: { votes: number[] } = $props();

	let chartData: ChartData<'bar'> | null = $state(null);

	$effect(() => {
		if (!browser) return;
		const next = votes.join(',');
		if ((chartData?.datasets[0].data as number[]).join(',') === next) return;
		chartData = {
			labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
			datasets: [
				{
					label: 'amount of votes',
					data: votes,
					backgroundColor: daisyChartColors(0.4),
					borderColor: daisyChartColors(1.0),
					borderWidth: 2,
					borderRadius: 15
				}
			]
		};
	});
</script>

{#if chartData}
	<Bar data={chartData} options={{ responsive: true }} />
{/if}

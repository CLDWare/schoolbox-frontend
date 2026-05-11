<script>
	import { onMount } from 'svelte';
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { daisyChartColors } from '$lib/chartColors';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let data = $state();

	onMount(() => {
		const bg = daisyChartColors(0.4);
		const border = daisyChartColors(1.0);

		data = {
			labels: ['1', '2', '3', '4', '5'],
			datasets: [
				{
					label: 'amount of votes',
					data: [12, 19, 3, 5, 2],
					backgroundColor: bg,
					borderColor: border,
					borderWidth: 2
				}
			]
		};
	});
</script>

{#if data}
	<Bar {data} options={{ responsive: true }} />
{/if}

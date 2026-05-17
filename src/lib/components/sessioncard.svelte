v<script lang="ts">
	let { question, votes } = $props();

	import Barchart from '$lib/components/barchart.svelte';
</script>

<div class="rounded-box bg-base-100">
	<h2>{question}</h2>
	<Barchart {votes} />
</div>

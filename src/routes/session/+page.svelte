<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import Barchart from '$lib/components/barchart.svelte';
</script>

{#if data.session.success}
	{data.session.data.question}
{:else}
	{data.session.message}
{/if}

<Barchart />

<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import Sessiondetail from '$lib/components/sessiondetail.svelte';
</script>

<div class="mx-auto mt-5 max-w-7xl">
	{#if data.session.success}
		<Sessiondetail data={data.session.data} />
	{:else}
		Not found or not authed idk
	{/if}
</div>

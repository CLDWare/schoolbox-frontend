<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import Sessioncard from '$lib/components/adminsessioncard.svelte';
</script>

<div class="mx-auto max-w-7xl">
	{#if data.sessions.success}
		{#each data.sessions.data as session (session.id)}
			<Sessioncard data={session} />
		{/each}
	{/if}
</div>

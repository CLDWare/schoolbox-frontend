<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import Sessioncard from '$lib/components/sessioncard.svelte';
</script>

<div class="mx-auto grid max-w-7xl grid-cols-3 gap-4">
	{#if data.sessions.success}
		{#each data.sessions.data as session (session.id)}
			<Sessioncard question={session.question} votes={session.votes} />
		{/each}
	{/if}
</div>

<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

{#if data.session.success}
	{data.session.data.question}
{:else}
	{data.session.message}
{/if}
